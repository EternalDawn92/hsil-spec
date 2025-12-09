export const INTENT_ELEMENTS = new Set([
  "E1_Discover", "E2_Understand", "E3_SeekNovelty", "E4_Observe", "E5_Expand",
  "T1_Create", "T2_Modify", "T3_Optimize", "T4_Construct", "T5_Transition",
  "P1_Preserve", "P2_Defend", "P3_Stabilize", "P4_Avoid", "P5_Anchor",
  "R1_Connect", "R2_Communicate", "R3_Collaborate", "R4_Empathize", "R5_Belong"
]);

export const VALID_SCOPES = new Set([
  "Self", "Other", "Group", "Object", "Environment", "System"
]);

export const VALID_TEMPORAL = new Set([
  "Immediate", "ShortTerm", "LongTerm"
]);

export const VALID_MODES = new Set([
  "Dominant", "Blended", "Conflict"
]);

export class ParseError extends Error {}

/**
 * Parse a top-level HSIL document string.
 * Supports:
 *   - (intent ...)
 *   - (intent-composite ...)
 */
export function parseHSIL(text: string) {
  text = text.trim();

  if (text.startsWith("(intent ")) {
    return parseIntent(text);
  }

  if (text.startsWith("(intent-composite ")) {
    return parseComposite(text);
  }

  throw new ParseError(
    "HSIL document must begin with (intent ...) or (intent-composite ...)"
  );
}

/**
 * Extract a (field value) pair from a simple HSIL block.
 */
function extract(field: string, text: string): string | null {
  const pattern = new RegExp(`\\(${field}\\s+([^\\)]+)\\)`);
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

/**
 * Parse a single (intent ...) expression and validate HSIL v0.1 rules.
 */
function parseIntent(text: string) {
  const type = extract("type", text);
  const intensity = extract("intensity", text);
  const scope = extract("scope", text);
  const temporal = extract("temporal", text);

  if (!type) {
    throw new ParseError("Missing field: type");
  }
  if (!INTENT_ELEMENTS.has(type)) {
    throw new ParseError(`Invalid Intent Element: ${type}`);
  }

  if (!intensity) {
    throw new ParseError("Missing field: intensity");
  }
  const intensityVal = parseFloat(intensity);
  if (Number.isNaN(intensityVal)) {
    throw new ParseError("Intensity must be numeric");
  }
  if (intensityVal < 0.0 || intensityVal > 1.0) {
    throw new ParseError("Intensity must be between 0.0 and 1.0");
  }

  if (!scope || !VALID_SCOPES.has(scope)) {
    throw new ParseError(`Invalid scope: ${scope}`);
  }

  if (!temporal || !VALID_TEMPORAL.has(temporal)) {
    throw new ParseError(`Invalid temporal mode: ${temporal}`);
  }

  return {
    type,
    intensity: intensityVal,
    scope,
    temporal
  };
}

/**
 * Parse an (intent-composite ...) expression.
 */
function parseComposite(text: string) {
  const mode = extract("mode", text);
  if (!mode || !VALID_MODES.has(mode)) {
    throw new ParseError(`Invalid composite mode: ${mode}`);
  }

  const intentRegex = /\(intent[\s\S]*?\)/g;
  const matches = text.match(intentRegex) || [];

  if (matches.length < 2) {
    throw new ParseError("Composite requires at least 2 (intent ...) blocks");
  }

  const intents = matches.map(block => parseIntent(block));

  return {
    mode,
    intents
  };
}
