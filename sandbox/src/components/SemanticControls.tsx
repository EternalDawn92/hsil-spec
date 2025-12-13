import React from 'react';
import type { HSIL, IntentScope, IntentType, Temporal } from "../types";
import { ALL_INTENT_TYPES, ALL_SCOPES, ALL_TEMPORALS } from "../types";
interface SemanticControlsProps {
    hsil: HSIL | null;
    onUpdate: (newHSIL: HSIL) => void;
}

export const SemanticControls: React.FC<SemanticControlsProps> = ({ hsil, onUpdate }) => {
    if (!hsil) {
        return (
            <div className="panel">
                <div className="panel-header">
                    <span className="panel-title">Semantic Controls</span>
                </div>
                <div style={{ color: 'var(--color-text-dim)' }}>Select an intent to edit.</div>
            </div>
        );
    }

    const handleChange = (field: keyof HSIL, value: any) => {
        onUpdate({ ...hsil, [field]: value });
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Semantic Controls</span>
            </div>
            <div style={{ display: 'grid', gap: '15px' }}>

                {/* Type */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Intent Type</label>
                    <select
                        value={hsil.type}
                        onChange={(e) => handleChange('type', e.target.value as IntentType)}
                    >
                        {ALL_INTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {/* Intensity */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Intensity</label>
                        <span style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{hsil.intensity.toFixed(2)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={hsil.intensity}
                        onChange={(e) => handleChange('intensity', parseFloat(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer' }}
                    />
                </div>

                {/* Scope */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Scope</label>
                    <select
                        value={hsil.scope}
                        onChange={(e) => handleChange('scope', e.target.value as IntentScope)}
                    >
                        {ALL_SCOPES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Temporal */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>Temporal</label>
                    <select
                        value={hsil.temporal}
                        onChange={(e) => handleChange('temporal', e.target.value as Temporal)}
                    >
                        {ALL_TEMPORALS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

            </div>
        </div>
    );
};
