from pathlib import Path

from agent.app.prompt import build_contents, build_system_prompt

REPO_KNOWLEDGE = Path(__file__).resolve().parent.parent.parent / "knowledge" / "digital-eric.md"
VENDORED_KNOWLEDGE = Path(__file__).resolve().parent.parent / "knowledge" / "digital-eric.md"


def test_vendored_knowledge_matches_canonical_file():
    """agent/ deploys self-contained, so its knowledge copy must never drift."""
    assert VENDORED_KNOWLEDGE.read_bytes() == REPO_KNOWLEDGE.read_bytes()


def test_system_prompt_includes_framing_and_knowledge():
    prompt = build_system_prompt(knowledge="ERIC LIKES PIZZA")
    assert "Digital Eric" in prompt
    assert "first-person" in prompt
    assert "KNOWLEDGE FILE" in prompt
    assert "ERIC LIKES PIZZA" in prompt


def test_system_prompt_loads_real_knowledge_file():
    knowledge = build_system_prompt()
    assert "Full-Stack AI Engineer" in knowledge  # authored fact from ticket #5
    assert "## Boundaries" in knowledge


def test_build_contents_maps_roles_and_caps_history():
    history = [
        {"role": "assistant" if i % 2 else "user", "content": f"m{i}"} for i in range(10)
    ]
    contents = build_contents(history, "new question")
    # last 8 history turns + the new question
    assert len(contents) == 9
    assert contents[-1]["parts"][0]["text"] == "new question"
    assert all(c["role"] in ("user", "model") for c in contents)
