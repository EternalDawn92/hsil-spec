// src/types.ts

// All allowed HSIL intent types
export type IntentType =
    | "E1_Discover"
    | "E2_Understand"
    | "E3_SeekNovelty"
    | "E4_Observe"
    | "E5_Expand"
    | "T1_Create"
    | "T2_Modify"
    | "T3_Optimize"
    | "T4_Construct"
    | "T5_Transition"
    | "P1_Preserve"
    | "P2_Defend"
    | "P3_Stabilize"
    | "P4_Avoid"
    | "P5_Anchor"
    | "R1_Connect"
    | "R2_Communicate"
    | "R3_Collaborate"
    | "R4_Empathize"
    | "R5_Belong";

export type Scope =
    | "Self"
    | "Other"
    | "Group"
    | "Object"
    | "Environment"
    | "System";

// Some components expect this name instead of Scope
export type IntentScope = Scope;

export type Temporal = "Immediate" | "ShortTerm" | "LongTerm";

// 👇 HSIL object shape
export interface HSIL {
    type: IntentType;
    intensity: number; // 0.0 - 1.0
    scope: Scope;
    temporal: Temporal;
}

export interface IntentChainItem {
    id: string;
    text: string;
    hsil: HSIL;
    timestamp: number;
}

export interface HSILState {
    currentText: string;
    currentHSIL: HSIL | null;
    intentChain: IntentChainItem[];
}

// Runtime arrays for UI components

export const ALL_INTENT_TYPES: IntentType[] = [
    "E1_Discover",
    "E2_Understand",
    "E3_SeekNovelty",
    "E4_Observe",
    "E5_Expand",
    "T1_Create",
    "T2_Modify",
    "T3_Optimize",
    "T4_Construct",
    "T5_Transition",
    "P1_Preserve",
    "P2_Defend",
    "P3_Stabilize",
    "P4_Avoid",
    "P5_Anchor",
    "R1_Connect",
    "R2_Communicate",
    "R3_Collaborate",
    "R4_Empathize",
    "R5_Belong"
];

export const ALL_SCOPES: Scope[] = [
    "Self",
    "Other",
    "Group",
    "Object",
    "Environment",
    "System"
];

export const ALL_TEMPORAL: Temporal[] = [
    "Immediate",
    "ShortTerm",
    "LongTerm"
];

// 👇 alias with plural name because SemanticControls imports ALL_TEMPORALS
export const ALL_TEMPORALS = ALL_TEMPORAL;

// Optional helper aliases (if used elsewhere)
export const SCOPE_OPTIONS = ALL_SCOPES;
export const TEMPORAL_OPTIONS = ALL_TEMPORAL;