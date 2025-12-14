import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IntentInput } from './components/IntentInput';
import { HSILViewer } from './components/HSILViewer';
import { SemanticControls } from './components/SemanticControls';
import { IntentChain } from './components/IntentChain';
import { IntentGraph } from './components/IntentGraph';
import { AgentSimulation } from './components/AgentSimulation';
import { CompositeResolutionPanel } from './components/CompositeResolutionPanel';
import { encodeIntent } from './lib/api';
import type { HSIL, IntentChainItem } from './types';

function App() {
  const [, setCurrentText] = useState<string>("");
  const [currentHSIL, setCurrentHSIL] = useState<HSIL | null>(null);
  const [chain, setChain] = useState<IntentChainItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);

  const handleEncode = async (text: string) => {
    setIsLoading(true);
    setCurrentText(text);

    // Optimistic / Loading state handled by buttons
    const result = await encodeIntent(text);

    setIsLoading(false);
    setCurrentHSIL(result);

    const newItem: IntentChainItem = {
      id: uuidv4(),
      text,
      hsil: result,
      timestamp: Date.now()
    };

    setChain(prev => [...prev, newItem]);
    setSelectedChainId(newItem.id);
  };

  const handleUpdateHSIL = (updated: HSIL) => {
    setCurrentHSIL(updated);

    // Update the item in the chain if one is selected
    if (selectedChainId) {
      setChain(prev => prev.map(item =>
        item.id === selectedChainId ? { ...item, hsil: updated } : item
      ));
    }
  };

  const handleSelectChainItem = (id: string) => {
    const item = chain.find(c => c.id === id);
    if (item) {
      setSelectedChainId(id);
      setCurrentHSIL(item.hsil);
      setCurrentText(item.text);
    }
  };

  const clearChain = () => {
    setChain([]);
    setSelectedChainId(null);
    setCurrentHSIL(null);
    setCurrentText("");
  };

  return (
    <div className="container">
      {/* Header */}
      <header style={{ marginBottom: '-60px', marginTop: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '40px', textAlign: 'left', position: 'relative', zIndex: 2 }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '10px' }}>HSIL Sandbox</h1>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.5' }}>Explore how human intention is encoded and interpreted.</p>
        </div>
        <div style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src="/logo.png" alt="HSIL Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </header>

      <div className="grid-layout">
        {/* Row 1 */}
        <IntentInput onEncode={handleEncode} isLoading={isLoading} />
        <HSILViewer hsil={currentHSIL} />

        {/* Row 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <CompositeResolutionPanel chain={chain} />
          <SemanticControls hsil={currentHSIL} onUpdate={handleUpdateHSIL} />
        </div>
        <IntentChain
          chain={chain}
          selectedId={selectedChainId}
          onSelect={handleSelectChainItem}
          onClear={clearChain}
        />

        {/* Row 3 */}
        <IntentGraph chain={chain} selectedId={selectedChainId} />
        <AgentSimulation currentHSIL={currentHSIL} chain={chain} />
      </div>

      <footer style={{ marginTop: '50px', textAlign: 'center', color: 'var(--color-text-dim)', fontSize: '0.8rem' }}>
        HSIL Experience Sandbox v0.1 • Powered by Groq • Google Antigravity
      </footer>
    </div>
  );
}

export default App;
