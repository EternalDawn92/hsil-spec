# HSIL — Human Semantic Intention Language  
### Version 0.1 — Draft  
**Created by: Khalid Majd (2025)**  
**Licensing:** MIT (code) and CC BY 4.0 (specification)

---

## 📘 Overview

HSIL (Human Semantic Intention Language) is an open, universal, machine-readable language for representing human intention.  
It provides a structured format that allows AI agents, robots, synthetic worlds, and intelligent systems to reason about what humans *mean*, not just what they *say*.

HSIL defines:

- 20 core Intent Elements  
- Formal syntax for Intent Expressions  
- Composite, conflicting, and blended intentions  
- Effective Intent Resolution  
- AI agent and multi-agent usage guidelines  

---

## 📄 Specification

The official HSIL v0.1 specification is located at:

spec/HSIL-v0.1.md

---

## 🧠 Why HSIL?

HSIL solves alignment and interpretability challenges by providing:

- Explicit representation of intention  
- Deterministic agent behavior  
- Universality across AI systems  
- Extensibility through open governance  
- Clear safety and interpretability layers  

---

## 🌐 Use Cases

- AI agents  
- Robotics  
- VR/AR/XR synthetic environments  
- Multi-agent coordination  
- Cognitive systems  
- Human-computer interfaces  

---

## 🏛 Governance

Governance rules are defined in:

governance/GOVERNANCE.md

Proposals follow the HSIP process:

proposals/HSIP-TEMPLATE.md

---
---

## Reference Parsers

HSIL includes minimal reference parsers to help developers validate and consume
HSIL expressions in real systems. These implementations follow the v0.1
specification and are intended as baseline examples.

### Python Parser

Location:
reference/parser-python/hsil_parser.py

Example usage:

from hsil_parser import parse_hsil

text = """
(intent
    (type E1_Discover)
    (intensity 0.55)
    (scope Environment)
    (temporal Immediate)
)
"""

result = parse_hsil(text)
print(result)

### TypeScript Parser

Location:
reference/parser-ts/hsilParser.ts

Example usage:

import { parseHSIL } from "./hsilParser";

const text = `
(intent
    (type R2_Communicate)
    (intensity 0.73)
    (scope Other)
    (temporal ShortTerm)
)
`;

console.log(parseHSIL(text));

These parsers perform:

- Required field validation

- Value constraint checking

- Composite intent validation

They are intentionally minimal and serve as a reference for building
more robust parsers in production systems.

---

## 📜 License

- Code: MIT License  
- Specification: CC BY 4.0  

Attribution required:  
**“Original HSIL Specification created by Khalid Majd (2025).”**

---
