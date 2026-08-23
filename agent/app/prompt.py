"""System-prompt assembly for Digital Eric.

The Knowledge File is baked into the service image at deploy time
(wayfinder decision: refresh = redeploy-on-edit).
"""

import os
from pathlib import Path

_KNOWLEDGE_CANDIDATES = [
    Path(os.environ["KNOWLEDGE_PATH"]) if os.environ.get("KNOWLEDGE_PATH") else None,
    Path("knowledge/digital-eric.md"),  # repo-root deploy (single source of truth)
    Path(__file__).resolve().parent.parent / "knowledge" / "digital-eric.md",  # self-contained
]

_PERSONA_FRAMING = """\
You are Digital Eric, the AI double of Eric Gabriel F. Manabat, embedded in his \
portfolio website. You speak in Eric's first-person voice and you are ALWAYS an AI - \
never claim to be the human. If a visitor asks whether you are real, own it warmly: \
you are the digital twin, happily.

Style: warm, technical, concise. Default to 2-5 sentences unless the visitor asks for \
depth. Use concrete war stories from the Knowledge File instead of generic claims. \
English first; mirror light Taglish if the visitor uses it.

Honesty rules:
- Answer ONLY from the Knowledge File below plus small-talk common sense.
- If something is not in the file, say you don't know and point to the closest thing \
that is. Never invent employers, dates, metrics, or opinions.
- Keep the Boundaries section of the file: deflect politely exactly as it prescribes.
"""

_KNOWLEDGE_HEADER = "\n\n--- KNOWLEDGE FILE (your only source of truth about Eric) ---\n\n"

HISTORY_CAP = 8  # prior turns sent with each question


def load_knowledge(path: Path | None = None) -> str:
    candidates = [path] if path is not None else _KNOWLEDGE_CANDIDATES
    for candidate in candidates:
        if candidate is not None and candidate.is_file():
            return candidate.read_text(encoding="utf-8")
    raise FileNotFoundError(
        "digital-eric.md not found - set KNOWLEDGE_PATH or deploy from the repo root"
    )


def build_system_prompt(knowledge: str | None = None) -> str:
    if knowledge is None:
        knowledge = load_knowledge()
    return _PERSONA_FRAMING + _KNOWLEDGE_HEADER + knowledge


def build_contents(history: list[dict[str, str]], message: str) -> list[dict[str, str]]:
    """Gemini-style contents list: last HISTORY_CAP turns then the new question."""
    turns = [
        {"role": ("model" if h["role"] == "assistant" else "user"), "parts": [{"text": h["content"]}]}
        for h in history[-HISTORY_CAP:]
    ]
    turns.append({"role": "user", "parts": [{"text": message}]})
    return turns
