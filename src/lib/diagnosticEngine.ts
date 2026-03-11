import { ALL_SECTOR_TREES, BASIC_COMPLIANCE_RULES } from "@/data/diagnosticRules";
import { DiagnosticRule, RuleCondition, RuleSeverity } from "@/types/rules";

export interface DiagnosticInput {
    sector: string;
    companyType: string;
    employeeCount: string;
    objectives: string[];
    // Boolean checks from typical startup flow
    hasRccm: boolean;
    hasNif: boolean;
    hasCnss: boolean;
    hasInss: boolean;
    hasFiscalAttestation: boolean;
    // Current owned specific documents
    ownedDocuments: string[]; // List of IDs or Names
}

export interface RuleEvaluationResult {
    rule: DiagnosticRule | typeof BASIC_COMPLIANCE_RULES[0];
    passed: boolean;
    weight: number;
}

export interface DiagnosticReport {
    totalScore: number; // Percentage 0-100
    matchedRules: RuleEvaluationResult[];
    missingCritical: RuleEvaluationResult[]; // Bloquant rules missed
    missingMajor: RuleEvaluationResult[];    // Majeur rules missed
    missingMinor: RuleEvaluationResult[];    // Mineur rules missed
    passedCount: number;
    totalCount: number;
}

/**
 * Helper to evaluate a single condition against the form input
 */
function evaluateCondition(condition: RuleCondition, input: DiagnosticInput): boolean {
    const fieldValue = (input as any)[condition.field];

    switch (condition.operator) {
        case "EQUALS":
            return fieldValue === condition.value;
        case "NOT_EQUALS":
            return fieldValue !== condition.value;
        case "IN":
            if (Array.isArray(fieldValue)) {
                // If the field is an array (like objectives), check if any value intersects
                return fieldValue.some(v => (condition.value as any[]).includes(v));
            } else {
                return (condition.value as any[]).includes(fieldValue);
            }
        case "NOT_IN":
            if (Array.isArray(fieldValue)) {
                return !fieldValue.some(v => (condition.value as any[]).includes(v));
            } else {
                return !(condition.value as any[]).includes(fieldValue);
            }
        case "ALWAYS_TRUE":
            return true;
        default:
            return false;
    }
}

function getSeverityWeight(severity: RuleSeverity): number {
    switch (severity) {
        case "BLOQUANT": return 3;
        case "MAJEUR": return 2;
        case "MINEUR": return 1;
        default: return 1;
    }
}

/**
 * Core engine matching input against configured Sector Decision Trees.
 */
export function calculateComplianceScore(input: DiagnosticInput): DiagnosticReport {
    let applicableRules: (DiagnosticRule | typeof BASIC_COMPLIANCE_RULES[0])[] = [];

    // 1. Gather Basic Rules
    BASIC_COMPLIANCE_RULES.forEach(rule => {
        // Evaluate conditional applicability of the rule (often based on base docs)
        const applies = rule.conditions.every(cond => {
            return evaluateCondition(cond as RuleCondition, input);
        });

        // Basic compliance rules are constructed such that if the condition is TRUE, the user is MISSING the document.
        // E.g., hasRccm === false. So if it applies, it means they need it.
        // Actually, let's treat Basic rules just like Sector rules for consistency: 
        // We include it in the 'applicable' checklist if it applies to the company profile.
        // Base rules apply to EVERYONE (Creation & Industry).
        applicableRules.push({
            ...rule,
            // Mocking fields missing in BASIC_COMPLIANCE_RULES 
            type: "Obligation légale",
            authority: "État",
            description: "Document de base obligatoire.",
            officialCost: "Variable",
            legalDeadline: "N/A",
            realDeadline: "N/A"
        });
    });

    // 2. Gather Sector-Specific Rules
    const sectorTree = ALL_SECTOR_TREES.find(tree => tree.sectorId === input.sector);
    
    if (sectorTree) {
        sectorTree.rules.forEach(rule => {
            // Check if the rule conditions are met
            const isApplicable = rule.conditions.length === 0 || rule.conditions.every((cond: RuleCondition) => evaluateCondition(cond, input));
            if (isApplicable) {
                applicableRules.push(rule);
            }
        });
    }

    // 3. Evaluate Pass/Fail against ownedDocuments
    const evaluationResults: RuleEvaluationResult[] = applicableRules.map(rule => {
        let passed = false;
        
        // Check base rules directly against boolean flags first
        if (rule.id === "base_rccm") passed = input.hasRccm;
        else if (rule.id === "base_nif") passed = input.hasNif;
        else if (rule.id === "base_cnss") passed = input.hasCnss;
        // Check specific rules against names in ownedDocuments array
        else if (input.ownedDocuments.includes(rule.name) || input.ownedDocuments.includes(rule.id)) {
            passed = true;
        }

        return {
            rule,
            passed,
            weight: getSeverityWeight(rule.severity as RuleSeverity)
        };
    });

    // 4. Calculate Score
    let totalWeight = 0;
    let passedWeight = 0;
    const missingCritical: RuleEvaluationResult[] = [];
    const missingMajor: RuleEvaluationResult[] = [];
    const missingMinor: RuleEvaluationResult[] = [];

    evaluationResults.forEach(res => {
        totalWeight += res.weight;
        if (res.passed) {
            passedWeight += res.weight;
        } else {
            if (res.rule.severity === "BLOQUANT") missingCritical.push(res);
            else if (res.rule.severity === "MAJEUR") missingMajor.push(res);
            else missingMinor.push(res);
        }
    });

    const totalScore = totalWeight === 0 ? 100 : Math.round((passedWeight / totalWeight) * 100);

    return {
        totalScore,
        matchedRules: evaluationResults,
        missingCritical,
        missingMajor,
        missingMinor,
        passedCount: evaluationResults.filter(r => r.passed).length,
        totalCount: evaluationResults.length
    };
}
