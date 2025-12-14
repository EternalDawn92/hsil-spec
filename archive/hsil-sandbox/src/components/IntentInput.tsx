import React, { useState } from 'react';

interface IntentInputProps {
    onEncode: (text: string) => void;
    isLoading: boolean;
}

export const IntentInput: React.FC<IntentInputProps> = ({ onEncode, isLoading }) => {
    const [text, setText] = useState("");

    const handleClick = () => {
        if (text.trim()) {
            onEncode(text);
            setText("");
        }
    };

    return (
        <div className="panel">
            <div className="panel-header">
                <span className="panel-title">Natural Language Input</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                <p style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
                    Describe your intention in plain English. The agent will encode it into HSIL.
                </p>
                <textarea
                    placeholder="e.g. I want to learn about quantum physics..."
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                    style={{ resize: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <button
                        className="btn-primary"
                        onClick={handleClick}
                        disabled={isLoading || !text.trim()}
                    >
                        {isLoading ? "Encoding..." : "Encode as HSIL"}
                    </button>
                </div>
            </div>
        </div>
    );
};
