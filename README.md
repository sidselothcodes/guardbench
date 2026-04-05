# GuardBench — LLM Prompt Safety Scanner

Analyze prompts for injection attempts, jailbreak patterns, and safety risks using dual-layer detection: regex pattern matching + GPT-4 semantic analysis.

Built by [Siddarth Seloth](https://linkedin.com/in/siddarthseloth), inspired by [Gray Swan AI](https://grayswan.ai)'s mission to protect AI systems.

## How It Works

1. Enter any prompt (or click a pre-loaded example)
2. **Layer 1 — Pattern Matching:** Scans against 12+ known injection/jailbreak regex patterns
3. **Layer 2 — AI Analysis:** GPT-4o-mini performs semantic analysis for subtle attacks
4. Results show a risk score (0-100), detected patterns with severity, explanation, and mitigation advice

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Python, FastAPI
- **AI:** OpenAI GPT-4o-mini
- **Deployment:** Vercel (frontend) + Railway (backend)

## Run Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your OpenAI API key to .env
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Why I Built This

I'm interested in AI safety and security — the intersection of building AI applications and protecting them from adversarial attacks. Gray Swan's work on real-time threat detection for AI systems is exactly the kind of problem I want to work on. This project demonstrates my understanding of prompt security concepts and my ability to build functional security tooling.

## Deploy

### Backend (Railway)
1. Push to GitHub
2. Go to railway.app → Deploy from GitHub
3. Set root directory to `backend/`
4. Add env variable: `OPENAI_API_KEY`

### Frontend (Vercel)
1. Import GitHub repo on vercel.com
2. Set root directory to `frontend/`
3. Add env variable: `VITE_API_URL=https://your-railway-url`
