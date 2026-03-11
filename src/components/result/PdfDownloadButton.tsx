"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { ScoringResult, DiagnosticData } from "@/lib/scoring";
import { Objective } from "@/data/objectives";
import { Sector } from "@/data/sectors";
import { RequiredDocument } from "@/data/documents";
import { useTranslation } from "@/lib/i18n";

interface Props {
    result?: ScoringResult;
    data?: DiagnosticData;
    objective?: Objective;
    sector?: Sector;
    documents?: RequiredDocument[];
}

export default function PdfDownloadButton({ result, data, objective, sector, documents }: Props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            // -- 1. API Call (Log / Sauvegarde BDD) --
            await fetch("/api/reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    diagnosticData: data,
                    scoringResult: result,
                    source: "pdf_download",
                }),
            }).catch((err) => console.log("Sauvegarde rapport échouée", err));

            // -- 2. Génération PDF Premium --
            const { jsPDF } = await import("jspdf");
            const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

            // Design Tokens
            const GREEN_DARK = [13, 92, 58] as [number, number, number];
            const GREEN_MED = [22, 163, 74] as [number, number, number];
            const GREEN_LIGHT = [240, 253, 244] as [number, number, number];
            const BLACK = [15, 23, 42] as [number, number, number];
            const GRAY_DARK = [71, 85, 105] as [number, number, number];
            const GRAY_MED = [100, 116, 139] as [number, number, number];
            const GRAY_LIGHT = [248, 250, 252] as [number, number, number];
            const WHITE = [255, 255, 255] as [number, number, number];

            const margin = 25;
            const pageWidth = 210;
            const contentWidth = pageWidth - margin * 2;

            const isAudit = !!result && !!data;
            const companyNameLabel = isAudit ? (data?.companyName || "Non spécifié") : "Guide de Conformité";
            const sectorLabel = isAudit ? data?.sector : sector?.name;
            const mainTitle = isAudit ? "RAPPORT D'AUDIT" : "GUIDE SÉCURISÉ";
            const subTitleLabel = isAudit ? "DE CONFORMITÉ" : (objective?.label || "");

            // =========================================================
            // PAGE 1: COVER PAGE
            // =========================================================
            doc.setFillColor(...GREEN_DARK);
            doc.rect(0, 0, pageWidth, 297, "F"); // Full dark green background

            let currentY = 100;

            doc.setTextColor(...GREEN_MED);
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.text("agréa.", margin, currentY);
            currentY += 20;

            doc.setTextColor(...WHITE);
            doc.setFontSize(42);
            doc.text(mainTitle, margin, currentY);
            currentY += 15;
            doc.setFontSize(36);
            doc.setTextColor(255, 255, 255);
            doc.text(subTitleLabel, margin, currentY);
            currentY += 40;

            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(200, 200, 200);
            doc.text("ÉTABLI POUR", margin, currentY);
            currentY += 8;
            doc.setTextColor(...WHITE);
            doc.setFont("helvetica", "bold");
            doc.text(companyNameLabel, margin, currentY);
            currentY += 20;

            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(200, 200, 200);
            doc.text("SECTEUR D'ACTIVITÉ", margin, currentY);
            currentY += 8;
            doc.setTextColor(...WHITE);
            doc.setFont("helvetica", "bold");
            doc.text(sectorLabel || "Secteur", margin, currentY);
            currentY += 20;

            doc.setFontSize(14);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(200, 200, 200);
            doc.text("DATE", margin, currentY);
            currentY += 8;
            doc.setTextColor(...WHITE);
            doc.setFont("helvetica", "bold");
            doc.text(new Date().toLocaleDateString('fr-FR'), margin, currentY);

            // =========================================================
            // PAGE 2: EXECUTIVE SUMMARY
            // =========================================================
            doc.addPage();
            currentY = 30;

            if (isAudit) {
                doc.setFontSize(28);
                doc.setTextColor(...BLACK);
                doc.setFont("helvetica", "bold");
                doc.text("Synthèse Executive", margin, currentY);
                currentY += 20;

                // Client Info Grid
                doc.setFillColor(...GRAY_LIGHT);
                doc.roundedRect(margin, currentY, contentWidth, 40, 2, 2, "F");
                
                doc.setFontSize(10);
                doc.setTextColor(...GRAY_MED);
                doc.setFont("helvetica", "bold");
                doc.text("CONTACT", margin + 10, currentY + 10);
                doc.text("TÉLÉPHONE", margin + 80, currentY + 10);
                
                doc.setTextColor(...BLACK);
                doc.setFontSize(12);
                doc.text(data?.contactName || "N/A", margin + 10, currentY + 17);
                doc.text(data?.contactPhone || "N/A", margin + 80, currentY + 17);

                doc.setFontSize(10);
                doc.setTextColor(...GRAY_MED);
                doc.text("TYPE SOCIÉTÉ", margin + 10, currentY + 28);
                doc.text("VILLE", margin + 80, currentY + 28);

                doc.setTextColor(...BLACK);
                doc.setFontSize(12);
                doc.text(data?.companyType?.toUpperCase() || "N/A", margin + 10, currentY + 35);
                doc.text(data?.city || "N/A", margin + 80, currentY + 35);
                
                currentY += 60;

                // Score Graphic
                doc.setFillColor(...WHITE);
                doc.setDrawColor(...GRAY_LIGHT);
                doc.setLineWidth(1);
                doc.roundedRect(margin, currentY, contentWidth, 50, 3, 3, "FD");

                doc.setFontSize(12);
                doc.setTextColor(...GRAY_DARK);
                doc.setFont("helvetica", "bold");
                doc.text("SCORE DE CONFORMITÉ GLOBAL", margin + 15, currentY + 15);
                
                const score = result?.score || 0;
                let color = [220, 38, 38]; // Red
                if (score > 40) color = [217, 119, 6]; // Yellow
                if (score > 75) color = GREEN_MED; // Green

                doc.setFontSize(48);
                doc.setTextColor(color[0], color[1], color[2]);
                doc.text(`${score}`, margin + 15, currentY + 40);
                
                doc.setFontSize(14);
                doc.setTextColor(...GRAY_MED);
                doc.text("/ 100", margin + 18 + doc.getTextWidth(`${score}`), currentY + 40);

                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                const gapCount = result?.gaps?.length || 0;
                doc.text(`Identifié : ${gapCount} actions requises pour atteindre la conformité totale.`, margin + 15 + doc.getTextWidth(`${score} / 100`) + 20, currentY + 36);

                currentY += 70;

                // Strengths
                if (result?.strengths && result.strengths.length > 0) {
                    doc.setFontSize(16);
                    doc.setTextColor(...BLACK);
                    doc.setFont("helvetica", "bold");
                    doc.text("Documents Validés", margin, currentY);
                    currentY += 10;
                    
                    doc.setFillColor(...GREEN_LIGHT);
                    doc.roundedRect(margin, currentY, contentWidth, 10 + (result.strengths.length * 8), 2, 2, "F");
                    
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    doc.setTextColor(...GREEN_DARK);
                    result.strengths.forEach((strength, i) => {
                        doc.text(`✓ ${strength}`, margin + 8, currentY + 12 + (i * 7));
                    });
                    currentY += 10 + (result.strengths.length * 8) + 15;
                }

                // =========================================================
                // PAGE 3+: ACTION PLAN (AUDIT ONLY)
                // =========================================================
                doc.addPage();
                currentY = 30;
                doc.setFontSize(28);
                doc.setTextColor(...BLACK);
                doc.setFont("helvetica", "bold");
                doc.text("Plan d'Action Détaillé", margin, currentY);
                currentY += 20;

                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(...GRAY_DARK);
                doc.text("Les étapes ci-dessous sont classées par ordre de priorité selon la réglementation.", margin, currentY);
                currentY += 15;

                result?.gaps?.forEach((gap, index) => {
                    if (currentY > 240) { doc.addPage(); currentY = 30; }
                    doc.setFillColor(...WHITE);
                    doc.setDrawColor(...GRAY_LIGHT);
                    doc.setLineWidth(0.5);
                    doc.roundedRect(margin, currentY, contentWidth, 50, 2, 2, "FD");
                    
                    const severityColor = gap.severity === 'critical' ? [220, 38, 38] : gap.severity === 'important' ? [217, 119, 6] : [22, 163, 74];
                    doc.setFillColor(...(severityColor as [number, number, number]));
                    doc.roundedRect(margin + contentWidth - 30, currentY + 5, 25, 6, 1, 1, "F");
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(7);
                    doc.setFont("helvetica", "bold");
                    const sevLabel = gap.severity === 'critical' ? 'BLOQUANT' : gap.severity === 'important' ? 'MAJEUR' : 'MINEUR';
                    doc.text(sevLabel, margin + contentWidth - 17.5, currentY + 9, { align: "center" });
                    
                    doc.setTextColor(...BLACK);
                    doc.setFontSize(14);
                    doc.text(`${index + 1}. ${gap.title}`, margin + 8, currentY + 12);
                    
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(...GRAY_DARK);
                    const splitDesc = doc.splitTextToSize(gap.description, contentWidth - 16);
                    doc.text(splitDesc, margin + 8, currentY + 22);
                    
                    const actionY = currentY + 24 + (splitDesc.length * 4);
                    doc.setFillColor(...GRAY_LIGHT);
                    doc.rect(margin + 5, actionY, contentWidth - 10, 12, "F");
                    doc.setTextColor(...BLACK);
                    doc.setFont("helvetica", "bold");
                    doc.text(`Action : ${gap.action}`, margin + 8, actionY + 8);
                    
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(9);
                    doc.text(`Délai estimé : ${gap.estimatedDays} jours`, margin + 8, currentY + 46);
                    if (gap.estimatedCostUsd > 0) {
                        doc.text(`Frais off. estimatifs : ${gap.estimatedCostUsd.toLocaleString()} USD`, margin + 60, currentY + 46);
                    }
                    currentY += 58;
                });
            } else {
                // GUIDE MODE: Documents list (Not an audit)
                doc.setFontSize(28);
                doc.setTextColor(...BLACK);
                doc.setFont("helvetica", "bold");
                doc.text("Documents Requis", margin, currentY);
                currentY += 20;

                documents?.forEach((d, index) => {
                    if (currentY > 250) { doc.addPage(); currentY = 30; }
                    doc.setFillColor(...WHITE);
                    doc.setDrawColor(...GRAY_LIGHT);
                    doc.roundedRect(margin, currentY, contentWidth, 40, 2, 2, "FD");

                    const docColor = d.isRequired ? [220, 38, 38] : GREEN_MED;
                    doc.setFillColor(docColor[0], docColor[1], docColor[2]);
                    doc.roundedRect(margin + 8, currentY + 5, 25, 5, 1, 1, "F");
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(7);
                    doc.setFont("helvetica", "bold");
                    doc.text(d.isRequired ? "OBLIGATOIRE" : "RECOMMANDÉ", margin + 20.5, currentY + 8.5, { align: "center" });

                    doc.setTextColor(...BLACK);
                    doc.setFontSize(12);
                    doc.text(`${index + 1}. ${d.name}`, margin + 8, currentY + 18);

                    doc.setTextColor(...GRAY_MED);
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    const splitDesc = doc.splitTextToSize(d.description, contentWidth - 16);
                    doc.text(splitDesc, margin + 8, currentY + 25);

                    currentY += 45;
                });
            }

            // Footer for all pages (except cover)
            const totalPages = (doc as any).internal.getNumberOfPages();
            for (let i = 2; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(...GRAY_MED);
                doc.setFont("helvetica", "normal");
                doc.text(`Page ${i - 1} sur ${totalPages - 1}`, pageWidth - margin, 285, { align: "right" });
                doc.text(`Document confidentiel Agréa Africa — Généré le ${new Date().toLocaleDateString('fr-FR')}`, margin, 285);
            }

            const fileName = isAudit ? `Audit_Agréa_${data?.companyName || 'Export'}` : `Guide_Agréa_${objective?.label || 'Export'}`;
            doc.save(`${fileName}.pdf`);

        } catch (err) {
            console.error("PDF Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="btn-primary"
            style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(13, 92, 58, 0.2)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
            }}
        >
            <Download size={18} />
            {loading ? t("pdf.generating") : t("pdf.download")}
        </button>
    );
}
