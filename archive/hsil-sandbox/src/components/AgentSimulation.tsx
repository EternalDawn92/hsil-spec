import React from 'react';
import type { HSIL, IntentChainItem } from '../types';
import { simulateAgent, generateChainSummary } from '../lib/simulation';

interface AgentSimulationProps {
    currentHSIL: HSIL | null;
    chain: IntentChainItem[];
}

export const AgentSimulation: React.FC<AgentSimulationProps> = ({ currentHSIL, chain }) => {
    if (!currentHSIL) {
        return (
            <div className="panel">
                <div className="panel-header">
                    <span className="panel-title">Agent Simulation</span>
                </div>
                <div style={{ color: 'var(--color-text-dim)' }}>Select an intent to see simulation.</div>
            </div>
        );
    }

    const result = simulateAgent(currentHSIL);
    const chainSummary = generateChainSummary(chain.map(c => c.hsil));

    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Agent Simulation</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* Output Narrative */}
                <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Narrative Output</h4>
                    <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {result.narrative.join(" ")}
                    </p>
                </div>

                {/* Behavior Probabilities */}
                <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Behavior Probabilities</h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {Object.entries(result.behaviors).map(([name, prob]) => (
                            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ width: '100px', fontSize: '0.9rem' }}>{name}</span>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', height: '6px', borderRadius: '3px' }}>
                                    <div
                                        style={{
                                            width: `${prob * 100}%`,
                                            background: 'var(--color-primary)',
                                            height: '100%',
                                            borderRadius: '3px'
                                        }}
                                    />
                                </div>
                                <span style={{ fontSize: '0.8rem', width: '40px', textAlign: 'right' }}>{(prob * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chain Context */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '15px' }}>
                    <h4 style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem', marginBottom: '5px' }}>Chain Context</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
                        {chainSummary}
                    </div>
                </div>

            </div>
        </div>
    );
};
