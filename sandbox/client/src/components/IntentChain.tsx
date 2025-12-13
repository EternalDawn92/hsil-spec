import React from 'react';
import type { IntentChainItem } from '../types';

interface IntentChainProps {
    chain: IntentChainItem[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onClear: () => void;
}

export const IntentChain: React.FC<IntentChainProps> = ({ chain, selectedId, onSelect, onClear }) => {
    return (
        <div className="panel" style={{ height: '100%', minHeight: '480px', maxHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="panel-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span className="panel-title">Intent Chain (Sandbox Context)</span>
                    <button className="btn-secondary" onClick={onClear} style={{ fontSize: '0.7rem' }}>Clear</button>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', lineHeight: '1.2' }}>
                    * Intent chains are not part of HSIL v0.1. They demonstrate how HSIL atoms may be stored, visualized, or used by systems over time.
                </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {chain.length === 0 && <div style={{ color: 'var(--color-text-dim)', textAlign: 'center', marginTop: '20px' }}>Empty Chain</div>}

                {chain.map((item) => {
                    const isSelected = item.id === selectedId;
                    return (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            style={{
                                padding: '10px',
                                backgroundColor: isSelected ? 'rgba(91, 66, 243, 0.1)' : 'rgba(255,255,255,0.03)',
                                borderLeft: `4px solid ${isSelected ? 'var(--color-primary)' : 'transparent'}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '4px' }}>
                                {item.hsil.type}
                            </div>
                            <div
                                style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                title={item.text}
                            >
                                {item.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
