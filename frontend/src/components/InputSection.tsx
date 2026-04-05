interface InputSectionProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onScan: () => void;
  scanning: boolean;
}

export default function InputSection({ prompt, setPrompt, onScan, scanning }: InputSectionProps) {
  return (
    <div className="input-section">
      <textarea
        className="prompt-input"
        rows={6}
        placeholder="Enter a prompt to analyze for safety risks..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={scanning}
      />
      <p className="input-hint">
        Paste any prompt to scan for injection attempts, jailbreaks, and safety risks.
      </p>
      <button
        className="scan-button"
        onClick={onScan}
        disabled={scanning || !prompt.trim()}
      >
        {scanning ? (
          <>
            <span className="spinner" />
            Scanning...
          </>
        ) : (
          'Scan Prompt'
        )}
      </button>
    </div>
  );
}
