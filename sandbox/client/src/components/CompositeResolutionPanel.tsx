import React, { useMemo } from 'react';
import type { IntentChainItem, HSIL, IntentType } from '../types';

interface CompositeResolutionPanelProps {
    chain: IntentChainItem[];
}

type ResolutionMode = "Dominant" | "Blended" | "Conflicted";

interface ResolvedState {
    mode: ResolutionMode;
    effectiveIntent: HSIL | null;
    explanation: string;
}

// Priority: P > R > T > E
const getCategoryPriority = (type: IntentType): number => {
    if (type.startsWith('P')) return 4;
    if (type.startsWith('R')) return 3;
    if (type.startsWith('T')) return 2;
    if (type.startsWith('E')) return 1;
    return 0;
};

const getTemporalMultiplier = (temp: string): number => {
    switch (temp) {
        case 'Immediate': return 1.2;
        case 'ShortTerm': return 1.0;
        case 'LongTerm': return 0.8;
        default: return 1.0;
    }
};

export const CompositeResolutionPanel: React.FC<CompositeResolutionPanelProps> = ({ chain }) => {

    const resolution = useMemo((): ResolvedState => {
        if (chain.length === 0) {
            return { mode: "Dominant", effectiveIntent: null, explanation: "No active intentions." };
        }

        // 1. Calculate Effective Scores
        const scoredIntents = chain.map(item => {
            const priority = getCategoryPriority(item.hsil.type);
            const multiplier = getTemporalMultiplier(item.hsil.temporal);
            const score = item.hsil.intensity * multiplier;
            return { ...item, priority, score };
        });

        // 2. Sort by Priority (desc), then Score (desc)
        scoredIntents.sort((a, b) => {
            if (b.priority !== a.priority) return b.priority - a.priority;
            return b.score - a.score;
        });

        const winner = scoredIntents[0];
        const runnerUp = scoredIntents[1];

        // 3. Determine Mode
        let mode: ResolutionMode = "Dominant";
        let explanation = "";

        if (!runnerUp) {
            mode = "Dominant";
            explanation = `Single active intent resolved directly.`;
        } else {
            const scoreDiff = winner.score - runnerUp.score;

            // Check for conflict: Different categories area strong signal
            // Or explicit opposition (e.g. Avoid vs Discover)
            const differentCategories = winner.priority !== runnerUp.priority;

            if (differentCategories && winner.score < 1.0 && scoreDiff < 0.3) {
                // If priorities differ but scores are somewhat close
                mode = "Conflicted";
                explanation = `Conflict between ${winner.hsil.type} and ${runnerUp.hsil.type}. Priority rules favor ${winner.hsil.type.charAt(0)}-series.`;
            } else if (scoreDiff < 0.2) {
                // Close scores, same category -> Blended
                mode = "Blended";
                explanation = `Similar intensities for ${winner.hsil.type} and ${runnerUp.hsil.type} result in a blended state.`;
            } else {
                mode = "Dominant";
                explanation = `${winner.hsil.type} is dominant due to higher intensity and priority.`;
            }
        }

        return {
            mode,
            effectiveIntent: winner.hsil,
            explanation
        };

    }, [chain]);

    const getBadgeColor = (mode: ResolutionMode) => {
        switch (mode) {
            case "Dominant": return 'var(--color-primary)';
            case "Blended": return '#10b981'; // Emerald
            case "Conflicted": return '#f59e0b'; // Amber
        }
    };

    return (
        <div className="panel" style={{ minHeight: '180px' }}>
            <div className="panel-header" style={{ justifyContent: 'space-between' }}>
                <span className="panel-title">Composite Resolution (HSIL v0.1)</span>
                {resolution.effectiveIntent && (
                    <span style={{
                        fontSize: '0.7rem',
                        background: getBadgeColor(resolution.mode),
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontWeight: 600
                    }}>
                        {resolution.mode.toUpperCase()}
                    </span>
                )}
            </div>

            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                {!resolution.effectiveIntent ? (
                    <div style={{ color: 'var(--color-text-dim)', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                        Waiting for intentions...
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginBottom: '4px' }}>
                                    EFFECTIVE INTENT
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-bright)' }}>
                                    {resolution.effectiveIntent.type}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginBottom: '4px' }}>
                                    NET INTENSITY
                                </div>
                                <div style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>
                                    {resolution.effectiveIntent.intensity.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '10px',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            color: 'var(--color-text-dim)',
                            marginTop: 'auto'
                        }}>
                            {resolution.explanation}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
