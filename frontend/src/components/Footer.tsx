export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Built by <strong>Siddarth Seloth</strong> to explore AI safety and prompt security.
      </p>
      <p>
        Inspired by{' '}
        <a href="https://grayswan.ai" target="_blank" rel="noopener noreferrer">
          Gray Swan AI
        </a>
        's mission to protect AI systems.
      </p>
      <div className="footer-links">
        <a
          href="https://linkedin.com/in/siddarthseloth"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/siddarthseloth"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
