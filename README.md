# HSIL — Human Semantic Intention Language  
[![Version](https://img.shields.io/badge/HSIL-v0.1-blue)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]()
[![License: CC BY 4.0](https://img.shields.io/badge/Spec%20License-CC--BY%204.0-orange.svg)]()
[![Status](https://img.shields.io/badge/Status-Draft-yellow.svg)]()

*A structured, interpretable language for encoding human intention across agents, AI models, and synthetic environments.*

### Version 0.1 — Draft  
**Created by: Khalid Majd (2025)**  
**Licensing:** MIT (code) and CC BY 4.0 (specification)

---

## Overview

HSIL (Human Semantic Intention Language) is an expressive, structured language for representing human intentions in a form that AI systems, agents, and computational environments can interpret consistently.  
Its purpose is to create a universal, machine-readable interface for intention, something that can be parsed, validated, reasoned over, and acted upon by both symbolic and learned systems.

HSIL enables:

- **Interpretable human–AI communication**  
  AI systems can understand explicit intention signals rather than inferring them indirectly.

- **Unified semantics across agents**  
  Multiple agents—robotic, software-based, autonomous—can collaborate using a shared intention protocol.

- **Robust grounding for synthetic environments**  
  Simulations, virtual worlds, and agentic frameworks can use HSIL as a stable internal representation of goals and motivation.

- **Extensibility for advanced behaviors**  
  HSIL is designed to grow through formal proposals (HSIPs), allowing new intention types, modalities, and structural elements.

HSIL v0.1 defines the core syntax, intention elements, temporal structures, and composition rules required for deterministic interpretation. Future versions expand capabilities through community-driven governance.

---

## Quickstart

Here is a minimal HSIL Intent Expression:

    (intent
        (type E1_Discover)
        (intensity 0.60)
        (scope Environment)
        (temporal Immediate)
    )


Core rules in HSIL v0.1:

- `type` must be one of the 20 Intent Elements (E/T/P/R series)  
- `intensity` is a float between 0.0 and 1.0  
- `scope` must be one of: Self, Other, Group, Object, Environment, System  
- `temporal` must be one of: Immediate, ShortTerm, LongTerm  

You can find additional examples in:

    examples/
      basic-intents.hsil
      composite-examples.hsil
      agent-usage.hsil

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

## Roadmap

This roadmap outlines the planned evolution of HSIL from experimental concept to stable open standard.

### **v0.2 — Refinement Phase**
- Additional examples and test cases  
- Specification clarifications based on community feedback  
- Optional emotional context guidelines  
- Improvements to reference parsers  

### **v0.3 — Structural Enhancements**
- Preliminary intent graph concepts  
- Dynamic temporal transition modeling  
- Multi-agent negotiation guidelines  
- Deeper examples for robotics, agents, and simulations  

### **v1.0 — Stable Standard**
- Syntax frozen for long-term compatibility  
- Comprehensive test suite and validation tools  
- Fully specified core dictionary and fields  
- Conformance guidelines for agent frameworks  
- Formal HSIL certification process (optional)

---

HSIL is designed to evolve carefully through community-driven proposals (HSIPs) and governance review to ensure stability and extensibility.

---

## Repository Structure

Below is the layout of the HSIL repository:

    .
    ├── README.md
    ├── LICENSE                # MIT license for code
    ├── LICENSE-CC-BY-4.0      # CC-BY license for specification and docs
    ├── CONTRIBUTING.md
    ├── spec/
    │   ├── HSIL-v0.1.md       # Main HSIL specification
    │   └── pdf/               # (optional) PDF exports
    ├── governance/
    │   └── GOVERNANCE.md      # HSIL governance model
    ├── proposals/
    │   └── HSIP-TEMPLATE.md   # Proposal template for changes/extensions
    ├── examples/
    │   ├── basic-intents.hsil
    │   ├── composite-examples.hsil
    │   └── agent-usage.hsil
    └── reference/
        ├── parser-python/
        │   └── hsil_parser.py
        └── parser-ts/
            └── hsilParser.ts

This structure ensures the specification, governance documents, examples, and
reference implementations are easy to navigate for all contributors.

---

## Developer Workflow

This section describes how developers typically work with HSIL in real systems.

### 1. Create an HSIL Intent Expression
Start by modeling a human intention using the HSIL syntax:

- Choose an appropriate Intent Element (`type`)
- Decide the `intensity` (0.0–1.0)
- Select a `scope` (Self, Other, Group, Object, Environment, System)
- Set the `temporal` mode (Immediate, ShortTerm, LongTerm)

For example:

    (intent
       (type T1_Create)
       (intensity 0.72)
       (scope Object)
       (temporal ShortTerm)
    )


---

### 2. Validate the expression using a reference parser
You may use one of the official parsers included in this repository.

Python:

    result = parse_hsil(text)


TypeScript:

    const intent = parseHSIL(text);


These parsers check:

- required fields  
- allowed values  
- numerical ranges  
- composite intent structure  

---

### 3. Use HSIL in your application or agent
Once parsed, HSIL can be used to drive:

- agent behavior  
- robotics actions  
- simulation environment responses  
- emotional modeling  
- multimodal interaction pipelines  

---

### 4. Propose improvements or extensions (HSIP Process)

If you want to propose changes to HSIL:

1. Create a new file in `/proposals/`
2. Use the template:
proposals/HSIP-TEMPLATE.md

3. Submit a Pull Request  
4. The HSIL Steering Committee (HSC) will review it

This ensures HSIL evolves in a structured, governance-backed way.

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

## 🏛 Governance

Governance rules are defined in:

    governance/GOVERNANCE.md

Proposals follow the HSIP process:

    proposals/HSIP-TEMPLATE.md

---

## 📜 License

- Code: MIT License  
- Specification: CC BY 4.0  

Attribution required:  
**“Original HSIL Specification created by Khalid Majd (2025).”**

---
