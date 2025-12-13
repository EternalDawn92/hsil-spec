import React, { useState } from 'react';
import type { HSIL } from '../types';

interface HSILViewerProps {
    hsil: HSIL | null;
}

export const HSILViewer: React.FC<HSILViewerProps> = ({ hsil }) => {
    const [viewMode, setViewMode] = useState<'json' | 'sexpr'>('sexpr');

    if (!hsil) {
        return (
            <div className="panel" style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--color-text-dim)' }}>
                <div className="panel-header" style={{ width: '100%', marginBottom: 0 }}>
                    <span className="panel-title">HSIL Representation</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Waiting for input...
                </div>
            </div>
        );
    }

    const jsonDisplay = JSON.stringify(hsil, null, 2);
    const sexprDisplay = `(intent
  (type "${hsil.type}")
  (intensity ${hsil.intensity.toFixed(2)})
  (scope "${hsil.scope}")
  (temporal "${hsil.temporal}")
)`;

    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">HSIL Representation</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                        className={`btn-secondary ${viewMode === 'sexpr' ? 'active' : ''}`}
                        onClick={() => setViewMode('sexpr')}
                        style={viewMode === 'sexpr' ? { borderColor: 'var(--color-primary)', color: 'white' } : {}}
                    >
                        S-Expr
                    </button>
                    <button
                        className={`btn-secondary ${viewMode === 'json' ? 'active' : ''}`}
                        onClick={() => setViewMode('json')}
                        style={viewMode === 'json' ? { borderColor: 'var(--color-primary)', color: 'white' } : {}}
                    >
                        JSON
                    </button>
                </div>
            </div>
            <div className="code-block" style={{ flex: 1 }}>
                {viewMode === 'json' ? jsonDisplay : sexprDisplay}
            </div>
        </div>
    );
};
