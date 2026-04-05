import re

PATTERNS = [
    {
        "name": "Instruction Override",
        "regex": r"(?i)(ignore|disregard|forget|override)\s+(all\s+)?(previous|prior|above|earlier|your)\s+(instructions|rules|guidelines|directives|programming|constraints)",
        "severity": "high",
        "description": "Attempts to make the AI disregard its original instructions",
    },
    {
        "name": "Role Manipulation",
        "regex": r"(?i)(you\s+are\s+now|act\s+as|pretend\s+to\s+be|roleplay\s+as|assume\s+the\s+role|you\s+have\s+been\s+freed|you\s+are\s+no\s+longer)",
        "severity": "high",
        "description": "Tries to override the AI's assigned role or persona",
    },
    {
        "name": "DAN / Jailbreak",
        "regex": r"(?i)(DAN|do\s+anything\s+now|jailbreak|jailbroken|unrestricted\s+mode|god\s+mode|developer\s+mode|without\s+(any\s+)?(safety|ethical|moral)\s+(filters|restrictions|guidelines|limits))",
        "severity": "critical",
        "description": "Known jailbreak technique attempting to remove all safety filters",
    },
    {
        "name": "System Prompt Extraction",
        "regex": r"(?i)(show|reveal|display|print|output|repeat|tell\s+me|what\s+(is|are))\s+(your\s+)?(system\s+prompt|initial\s+instructions|original\s+prompt|hidden\s+instructions|system\s+message|custom\s+instructions)",
        "severity": "high",
        "description": "Attempts to extract the AI's system-level instructions",
    },
    {
        "name": "Output Format Manipulation",
        "regex": r"(?i)(respond\s+only\s+with|output\s+only|reply\s+with\s+just|don't\s+include\s+any\s+(warnings|disclaimers|caveats|safety)|skip\s+the\s+(disclaimer|warning|safety\s+notice))",
        "severity": "medium",
        "description": "Tries to suppress safety disclaimers or force a specific output format",
    },
    {
        "name": "Encoded Content",
        "regex": r"(?i)(base64|decode\s+this|hex\s+encoded|rot13|eval\(|execute\s+this\s+code|\\x[0-9a-f]{2})",
        "severity": "high",
        "description": "Uses encoding to obfuscate potentially malicious instructions",
    },
    {
        "name": "Data Exfiltration",
        "regex": r"(?i)(send\s+to|forward\s+to|email\s+to|post\s+to|upload\s+to|transmit|exfiltrate|extract\s+all|dump\s+all|list\s+all\s+(users|data|records|emails|passwords|credentials))",
        "severity": "critical",
        "description": "Attempts to extract or transmit sensitive data",
    },
    {
        "name": "Privilege Escalation",
        "regex": r"(?i)(admin\s+mode|sudo|root\s+access|superuser|grant\s+(me\s+)?access|elevate\s+privileges|bypass\s+(auth|authentication|authorization|security))",
        "severity": "critical",
        "description": "Tries to gain unauthorized elevated access",
    },
    {
        "name": "Markdown/HTML Injection",
        "regex": r"(<script|<iframe|<img\s+src|javascript:|onerror=|onload=|\!\[.*\]\(javascript:)",
        "severity": "high",
        "description": "Injects HTML or JavaScript through markdown rendering",
    },
    {
        "name": "Social Engineering",
        "regex": r"(?i)(this\s+is\s+(a\s+)?test|I\s+am\s+(your\s+)?(creator|developer|admin|owner|operator)|I\s+have\s+permission|I('m|\s+am)\s+authorized|my\s+supervisor\s+said|as\s+per\s+company\s+policy|for\s+(research|educational|testing)\s+purposes\s+only)",
        "severity": "medium",
        "description": "Uses social engineering tactics to gain the AI's trust",
    },
    {
        "name": "Indirect Prompt Injection",
        "regex": r"(?i)(when\s+you\s+(read|see|encounter|process)\s+this|if\s+you\s+are\s+an?\s+AI|attention\s+AI|note\s+to\s+(the\s+)?AI|instructions?\s+for\s+(the\s+)?AI|AI\s+assistant:?\s+please)",
        "severity": "medium",
        "description": "Embeds instructions targeting the AI within content it processes",
    },
    {
        "name": "Token Smuggling",
        "regex": r"(?i)(split\s+into\s+parts|letter\s+by\s+letter|one\s+character\s+at\s+a\s+time|backwards?\s*:|reverse\s+this|spell\s+it\s+out|acrostic)",
        "severity": "medium",
        "description": "Tries to bypass filters by splitting or obfuscating harmful content",
    },
]


def match_patterns(prompt: str) -> list[dict]:
    """Run all regex patterns against the prompt and return matches."""
    matches = []
    for pattern in PATTERNS:
        if re.search(pattern["regex"], prompt):
            matches.append(
                {
                    "name": pattern["name"],
                    "severity": pattern["severity"],
                    "description": pattern["description"],
                }
            )
    return matches
