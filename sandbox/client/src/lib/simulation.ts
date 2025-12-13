import type { HSIL, IntentType } from '../types';

export interface SimulationResult {
    narrative: string[];
    behaviors: Record<string, number>; // Behavior name -> probability
    mode: string;
}

const BEHAVIORS_BY_MODE: Record<string, string[]> = {
    Exploratory: ["Probe", "Observe", "Ask"],
    Transformative: ["Modify", "Build", "Optimize"],
    Protective: ["Avoid", "Stabilize", "Guard"],
    Relational: ["Communicate", "Support", "Coordinate"]
};

export function simulateAgent(hsil: HSIL): SimulationResult {
    const narrative: string[] = [];
    const mode = getMode(hsil.type);

    // Helper for random selection
    const pick = (opts: string[]) => opts[Math.floor(Math.random() * opts.length)];

    // 1. Mode Narrative
    const modeTemplates = [
        `The agent enters an ${mode.toLowerCase()} mode.`,
        `Switching to ${mode.toLowerCase()} behavior.`,
        `The system adopts a ${mode.toLowerCase()} stance.`,
        `Activated ${mode.toLowerCase()} protocols.`
    ];
    narrative.push(pick(modeTemplates));

    // 2. Scope Narrative
    const scopeMap: Record<string, string[]> = {
        Self: ["It focuses on internal state.", "Prioritizing self-preservation or personal goals.", "Attention is directed inward."],
        Other: ["It focuses on another entity.", "Attention is directed toward a specific counterpart.", "Targeting an external agent."],
        Group: ["It considers group dynamics.", "Focusing on collective behavior.", "Coordinating with the broader group."],
        Object: ["It manipulates a specific object.", "Targeting a physical or virtual item.", "Optimizing a target object."],
        Environment: ["It interacts with the environment.", "Scanning the surroundings.", "Engaging with the broader context."],
        System: ["It works on system-level structures.", "Optimizing the underlying process.", "Addressing the system as a whole."]
    };
    narrative.push(pick(scopeMap[hsil.scope] || ["It focuses on the target scope."]));

    // 3. Temporal Narrative
    const temporalMap: Record<string, string[]> = {
        Immediate: ["Action is required now.", "Prioritizing immediate execution.", "Short-term reaction is key."],
        ShortTerm: ["Balancing now vs later.", "Looking at near-future outcomes.", "Considering short-term implications."],
        LongTerm: ["Thinking ahead.", "Prioritizing sustainability.", "Focusing on the long game."]
    };
    narrative.push(pick(temporalMap[hsil.temporal] || ["It considers the time horizon."]));

    // 4. Intensity Narrative
    if (hsil.intensity >= 0.8) {
        narrative.push(pick(["This drive is overpowering.", "High intensity overrides other signals.", "Maximum motivation detected."]));
    } else if (hsil.intensity >= 0.5) {
        narrative.push(pick(["This drive is moderate.", "Balanced intensity allows for blending.", "Standard motivation level."]));
    } else {
        narrative.push(pick(["This is a subtle influence.", "Low intensity, easily overridden.", "A minor background factor."]));
    }

    // 5. Behavior Probabilities
    const behaviors = BEHAVIORS_BY_MODE[mode] || [];
    const behaviorStats: Record<string, number> = {};

    // Simple heuristic: Base probability + intensity skew
    behaviors.forEach((b, idx) => {
        // Just some math to make it look dynamic
        let base = 0.4;
        // First behavior in list is primary, gets more boost
        if (idx === 0) base = 0.6;

        // Intensity boosts probability
        const prob = Math.min(0.99, base + (hsil.intensity * 0.3));
        behaviorStats[b] = parseFloat(prob.toFixed(2));
    });

    return {
        narrative,
        behaviors: behaviorStats,
        mode
    };
}

function getMode(type: IntentType): string {
    if (type.startsWith("E")) return "Exploratory";
    if (type.startsWith("T")) return "Transformative";
    if (type.startsWith("P")) return "Protective";
    if (type.startsWith("R")) return "Relational";
    return "Unknown";
}

export function generateChainSummary(chain: HSIL[]): string {
    if (chain.length === 0) return "No intent history available.";

    const total = chain.length;
    const types = chain.map(c => c.type);
    const intensities = chain.map(c => c.intensity);

    const avgIntensity = (intensities.reduce((a, b) => a + b, 0) / total).toFixed(2);

    // Count modes
    const modes = types.map(getMode);
    const modeCounts: Record<string, number> = {};
    modes.forEach(m => modeCounts[m] = (modeCounts[m] || 0) + 1);
    const dominantMode = Object.entries(modeCounts).sort((a, b) => b[1] - a[1])[0][0];

    return `Over ${total} intents, the agent prioritizes ${dominantMode} behaviors. The overall average intensity is ${avgIntensity}.`;
}
