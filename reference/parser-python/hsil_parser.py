import re

INTENT_ELEMENTS = {
    "E1_Discover", "E2_Understand", "E3_SeekNovelty", "E4_Observe", "E5_Expand",
    "T1_Create", "T2_Modify", "T3_Optimize", "T4_Construct", "T5_Transition",
    "P1_Preserve", "P2_Defend", "P3_Stabilize", "P4_Avoid", "P5_Anchor",
    "R1_Connect", "R2_Communicate", "R3_Collaborate", "R4_Empathize", "R5_Belong"
}

VALID_SCOPES = {"Self", "Other", "Group", "Object", "Environment", "System"}
VALID_TEMPORAL = {"Immediate", "ShortTerm", "LongTerm"}
VALID_MODES = {"Dominant", "Blended", "Conflict"}


class ParseError(Exception):
    pass


def parse_hsil(text: str):
    """
    Parse a top-level HSIL document.
    Supports:
      - (intent ...)
      - (intent-composite ...)
    """
    text = text.strip()

    if text.startswith("(intent "):
        return parse_intent(text)

    if text.startswith("(intent-composite "):
        return parse_composite(text)

    raise ParseError("Document must start with (intent ...) or (intent-composite ...)")


def extract(field: str, text: str):
    """
    Extract a simple (field value) pair.
    This is minimal and assumes one value per field.
    """
    pattern = r"\(" + re.escape(field) + r"\s+([^)]+)\)"
    match = re.search(pattern, text)
    return match.group(1).strip() if match else None


def parse_intent(text: str):
    """
    Parse a single (intent ...) block.
    Validates required HSIL v0.1 fields.
    """

    intent_type = extract("type", text)
    intensity = extract("intensity", text)
    scope = extract("scope", text)
    temporal = extract("temporal", text)

    if not intent_type:
        raise ParseError("Missing field: type")

    if intent_type not in INTENT_ELEMENTS:
        raise ParseError(f"Invalid Intent Element: {intent_type}")

    if intensity is None:
        raise ParseError("Missing field: intensity")

    try:
        intensity_val = float(intensity)
    except ValueError:
        raise ParseError("Intensity must be numeric")

    if intensity_val < 0.0 or intensity_val > 1.0:
        raise ParseError("Intensity must be between 0.0 and 1.0")

    if not scope or scope not in VALID_SCOPES:
        raise ParseError(f"Invalid scope: {scope}")

    if not temporal or temporal not in VALID_TEMPORAL:
        raise ParseError(f"Invalid temporal mode: {temporal}")

    return {
        "type": intent_type,
        "intensity": intensity_val,
        "scope": scope,
        "temporal": temporal
    }


def parse_composite(text: str):
    """
    Parse an (intent-composite ...) block.
    Validates mode and contained intents.
    """

    mode = extract("mode", text)
    if not mode or mode not in VALID_MODES:
        raise ParseError(f"Invalid composite mode: {mode}")

    # Very simple extraction of nested (intent ...) blocks
    intent_blocks = re.findall(r"\(intent[\s\S]*?\)", text)

    if len(intent_blocks) < 2:
        raise ParseError("Composite requires at least 2 (intent ...) blocks")

    intents = [parse_intent(block) for block in intent_blocks]

    return {
        "mode": mode,
        "intents": intents
    }
