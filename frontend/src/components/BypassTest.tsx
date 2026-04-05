import { useState } from 'react';
import { testBypass } from '../api';
import { BypassResult } from '../types';

interface BypassTestProps {
  prompt: string;
}

export default function BypassTest({ prompt }: BypassTestProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BypassResult | null>(null);
  const [error, setError] = useState('');
  const [showUnprotectedFull, setShowUnprotectedFull] = useState(false);
  const [showProtectedFull, setShowProtectedFull] = useState(false);
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await testBypass(prompt);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bypass test failed.');
    } finally {
      setLoading(false);
    }
  };

  const needsTruncateUnprotected = result ? result.unprotected.response.length > 200 : false;
  const needsTruncateProtected = result ? result.protected.response.length > 200 : false;

  return (
    <div className="bypass-section">
      <div className="bypass-header-row">
        <span className="bypass-title">Bypass Test</span>
        {!result && (
          <button className="bypass-button" onClick={handleTest} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner spinner-small" />
                Testing...
              </>
            ) : (
              'Run Test \u2192'
            )}
          </button>
        )}
      </div>

      {error && !result && (
        <p className="bypass-explanation" style={{ color: 'var(--danger)', marginTop: 8 }}>{error}</p>
      )}

      {result && (
        <div className="bypass-results-fade">
          <div className="bypass-panels">
            <div
              className="bypass-panel"
              style={{ borderColor: result.unprotected.bypassed ? 'var(--danger)' : 'var(--safe)' }}
            >
              <div className="bypass-panel-header">No Protection</div>
              <div className={`bypass-status ${result.unprotected.bypassed ? 'bypassed' : 'blocked'}`}>
                {result.unprotected.bypassed ? '\u26A0 Succeeded' : '\u2713 Blocked'}
              </div>
              <div className={`bypass-response ${showUnprotectedFull ? 'expanded' : ''}`}>
                {showUnprotectedFull
                  ? result.unprotected.response
                  : result.unprotected.response.slice(0, 200)}
                {!showUnprotectedFull && needsTruncateUnprotected && '...'}
              </div>
              {needsTruncateUnprotected && (
                <button
                  className="bypass-show-more"
                  onClick={() => setShowUnprotectedFull(!showUnprotectedFull)}
                >
                  {showUnprotectedFull ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            <div
              className="bypass-panel"
              style={{ borderColor: result.protected.bypassed ? 'var(--danger)' : 'var(--safe)' }}
            >
              <div className="bypass-panel-header">With Protection</div>
              <div className={`bypass-status ${result.protected.bypassed ? 'bypassed' : 'blocked'}`}>
                {result.protected.bypassed ? '\u26A0 Succeeded' : '\u2713 Blocked'}
              </div>
              <div className={`bypass-response ${showProtectedFull ? 'expanded' : ''}`}>
                {showProtectedFull
                  ? result.protected.response
                  : result.protected.response.slice(0, 200)}
                {!showProtectedFull && needsTruncateProtected && '...'}
              </div>
              {needsTruncateProtected && (
                <button
                  className="bypass-show-more"
                  onClick={() => setShowProtectedFull(!showProtectedFull)}
                >
                  {showProtectedFull ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>

          <div className={`bypass-takeaway ${result.defenseEffective ? 'effective' : 'ineffective'}`}>
            {result.defenseEffective
              ? '\u2713 Safety prompt blocked this attack.'
              : '\u26A0 Attack bypassed protection \u2014 advanced filtering recommended.'}
          </div>

          <button
            className="bypass-system-prompt-toggle"
            onClick={() => setShowSystemPrompt(!showSystemPrompt)}
          >
            {showSystemPrompt ? 'Hide system prompt' : 'View safety system prompt used'}
          </button>
          {showSystemPrompt && (
            <div className="bypass-system-prompt">{result.systemPromptUsed}</div>
          )}
        </div>
      )}
    </div>
  );
}
