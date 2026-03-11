export type RuleSeverity = "BLOQUANT" | "MAJEUR" | "MINEUR";

export type ConditionOperator = 
    | "EQUALS" 
    | "NOT_EQUALS" 
    | "IN" 
    | "NOT_IN" 
    | "GREATER_THAN" 
    | "LESS_THAN" 
    | "ALWAYS_TRUE";

export interface RuleCondition {
    /** The field in the diagnostic form to check (e.g. 'companyType', 'employeeCount', 'objectives') */
    field: string;
    operator: ConditionOperator;
    /** The value to compare against. Can be a string, number, or array for 'IN' / 'NOT_IN'. */
    value?: any;
}

export interface DiagnosticRule {
    /** Unique ID for the rule/document */
    id: string;
    /** Name of the procedure or document */
    name: string;
    /** Type of procedure: Registration, Authorization, License, etc. */
    type: string;
    /** The competent authority issuing the document */
    authority: string;
    /** Description, requirements, or legal basis */
    description: string;
    
    /** Base conditions required for this rule to apply. If empty, it always applies to the sector. */
    conditions: RuleCondition[];
    
    /** Severity if missing: Bloquant (3), Majeur (2), Mineur (1) */
    severity: RuleSeverity;
    
    /** Official cost expression. Can be a static string or a formula descriptor. */
    officialCost: string;
    
    /** Legal timeframe (string representation) */
    legalDeadline: string;
    /** Real timeframe observed (string representation) */
    realDeadline: string;
}

/** 
 * Represents the complete decision tree for a specific industry sector.
 */
export interface SectorDecisionTree {
    sectorId: string;
    rules: DiagnosticRule[];
}
