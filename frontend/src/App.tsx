import { useState, useEffect } from 'react';
import { scanPrompt, pingHealth } from './api';
import { ScanResult } from './types';
import InputSection from './components/InputSection';
import ExamplePrompts from './components/ExamplePrompts';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [error, setError] = useState('');
  const [scanCounter, setScanCounter] = useState(0);

  useEffect(() => {
    pingHealth();
  }, []);

  const handleScan = async () => {
    if (!prompt.trim() || scanning) return;
    setScanning(true);
    setResultVisible(false);
    setResult(null);
    setError('');

    try {
      const data = await scanPrompt(prompt);
      setResult(data);
      setScanCounter((c) => c + 1);
      requestAnimationFrame(() => setResultVisible(true));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">GuardBench</h1>
        <p className="subtitle">LLM Prompt Safety Scanner</p>
      </header>

      <InputSection
        prompt={prompt}
        setPrompt={setPrompt}
        onScan={handleScan}
        scanning={scanning}
      />

      <ExamplePrompts onSelect={setPrompt} />

      {error && <div className="error-message">{error}</div>}

      {result && (
        <ResultCard
          key={scanCounter}
          result={result}
          visible={resultVisible}
          prompt={prompt}
        />
      )}

      <Footer />
    </div>
  );
}
