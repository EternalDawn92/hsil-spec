import React from 'react';
import type { IntentChainItem } from '../types';

interface IntentGraphProps {
    chain: IntentChainItem[];
    selectedId: string | null;
}

export const IntentGraph: React.FC<IntentGraphProps> = ({ chain, selectedId }) => {
    if (chain.length === 0) {
        return (
            <div className="panel" style={{ height: '400px' }}>
                <div className="panel-header">
                    <span className="panel-title">Intent Graph</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-dim)' }}>
                    No data to visualize
                </div>
            </div>
        );
    }

    // Simple layout logic: horizontal line
    const paddingX = 50;
    const width = Math.max(600, chain.length * 100);
    const height = 200;
    const spacing = 120;

    return (
        <div className="panel" style={{ overflow: 'hidden' }}>
            <div className="panel-header">
                <span className="panel-title">Intent Graph</span>
            </div>
            <div style={{ flex: 1, minHeight: '300px', width: '100%', overflowX: 'auto', overflowY: 'hidden', display: 'flex', alignItems: 'center' }}>
                <svg width={width} height={height} style={{ minWidth: width /* Force SVG to hold its size */ }}>
                    {/* Draw Edges */}
                    {chain.map((_, i) => {
                        if (i === chain.length - 1) return null;
                        const x1 = paddingX + i * spacing;
                        const x2 = paddingX + (i + 1) * spacing;
                        const y = height / 2;
                        return (
                            <line
                                key={`edge-${i}`}
                                x1={x1} y1={y} x2={x2} y2={y}
                                className="edge"
                            />
                        );
                    })}

                    {/* Draw Nodes */}
                    {chain.map((item, i) => {
                        const x = paddingX + i * spacing;
                        const y = height / 2;
                        const isSelected = item.id === selectedId;
                        const shortType = item.hsil.type.split('_')[0]; // e.g. E1, T2

                        return (
                            <g key={item.id} className={`node ${isSelected ? 'selected' : ''}`}>
                                <circle cx={x} cy={y} r={25} />
                                <text x={x} y={y}>{shortType}</text>
                                {isSelected && (
                                    <text x={x} y={y + 40} style={{ fontSize: '10px', fill: 'var(--color-primary)' }}>
                                        Current
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};
