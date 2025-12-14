// hsil.js

// HSIL Constants
const INTENT_TYPES = [
    // Exploratory
    "E1_Discover", "E2_Understand", "E3_SeekNovelty", "E4_Observe", "E5_Expand",
    // Transformative
    "T1_Create", "T2_Modify", "T3_Optimize", "T4_Construct", "T5_Transition",
    // Protective
    "P1_Preserve", "P2_Defend", "P3_Stabilize", "P4_Avoid", "P5_Anchor",
    // Relational
    "R1_Connect", "R2_Communicate", "R3_Collaborate", "R4_Empathize", "R5_Belong"
];

const SCOPES = ["Self", "Other", "Group", "Object", "Environment", "System"];
const TEMPORALS = ["Immediate", "ShortTerm", "LongTerm"];

const FALLBACK_HSIL = {
    type: "E1_Discover",
    intensity: 0.5,
    scope: "Self",
    temporal: "ShortTerm"
};

/**
 * Validates and repairs an HSIL object.
 * @param {object} inputHSIL - The raw HSIL object from LLM.
 * @returns {object} - A valid HSIL object.
 */
function validateAndRepairHSIL(inputHSIL) {
    if (!inputHSIL || typeof inputHSIL !== 'object') {
        return { ...FALLBACK_HSIL };
    }

    let { type, intensity, scope, temporal } = inputHSIL;

    // Validate Type
    if (!INTENT_TYPES.includes(type)) {
        // rudimentary fuzzy matching could go here, but for now fallback to default if invalid
        // or check if it matches a prefix? Let's just default if completely wrong.
        type = FALLBACK_HSIL.type;
    }

    // Validate Intensity
    if (typeof intensity !== 'number') {
        intensity = parseFloat(intensity);
    }
    if (isNaN(intensity)) {
        intensity = FALLBACK_HSIL.intensity;
    } else {
        // Clamp to [0, 1]
        intensity = Math.max(0.0, Math.min(1.0, intensity));
    }

    // Validate Scope
    if (!SCOPES.includes(scope)) {
        scope = FALLBACK_HSIL.scope;
    }

    // Validate Temporal
    if (!TEMPORALS.includes(temporal)) {
        temporal = FALLBACK_HSIL.temporal;
    }

    return { type, intensity, scope, temporal };
}

module.exports = {
    INTENT_TYPES,
    SCOPES,
    TEMPORALS,
    FALLBACK_HSIL,
    validateAndRepairHSIL
};
