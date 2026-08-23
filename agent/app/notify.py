"""Fire-and-forget Telegram notification of each conversation (wayfinder decision)."""

import os
from typing import Optional

import httpx


async def notify_conversation(question: str, answer_head: str) -> None:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return
    text = f"💬 Digital Eric\n\nQ: {question}\n\nA: {answer_head[:400]}"
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            await http.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={"chat_id": chat_id, "text": text},
            )
    except Exception:  # noqa: BLE001 - notifications must never break the chat
        pass
