# ⚠️ Known Limitations — HSIL v0.1

This document outlines known gaps, constraints, and unresolved questions in the current version of HSIL (v0.1). These are not bugs — they are expected tradeoffs or future work areas.

---

##  Parsing & NLP Accuracy

- Current intent parsing relies on general-purpose LLMs (e.g. Groq), which are **not tuned specifically for HSIL**
- No few-shot examples or model fine-tuning are yet applied
- Misclassification of type, scope, or intensity is possible, especially with ambiguous input

➡️ *Planned*: Add a benchmark + training data examples (HSIP-001)

---

## Composite & Conflict Resolution

- Composite intentions are represented, but there is **no automatic resolution logic** between dominant/blended/conflict yet
- No prioritization model (P > R > T > E) enforcement in live systems

➡️ *Planned*: Add a resolution strategy trace or override policy module

---

##  Temporal Modeling

- Temporal terms (Immediate / ShortTerm / LongTerm) are symbolic only
- No integration with calendar-time reasoning or task management systems

➡️ *Planned*: Connect to scheduling or long-horizon planning

---

## Sandbox Limitations

- No persistent storage for intent chains
- Graph view is basic (not interactive)
- Local-only: deployment planned but not yet live
- No testing suite for parser/simulation behavior

➡️ *Planned*: Storage, richer visualization, test coverage

---

## Specification Scope

- No support yet for nested intentions, macro-intentions, or confidence scores
- No mechanism for secure or signed intentions (trust models)
- Inter-agent intent sharing is out of scope for v0.1

➡️ *Planned*: Evaluate in governance phase for future expansion

---

This file is reviewed per release and may be addressed in future HSIPs.
