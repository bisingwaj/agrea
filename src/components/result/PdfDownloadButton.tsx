"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Objective } from "@/data/objectives";
import { Sector } from "@/data/sectors";
import { RequiredDocument } from "@/data/documents";
import { useTranslation } from "@/lib/i18n";

interface Props {
    objective: Objective;
    sector: Sector;
    documents: RequiredDocument[];
}

export default function PdfDownloadButton({ objective, sector, documents }: Props) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const { jsPDF } = await import("jspdf");
            const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

            const GREEN = [13, 92, 58] as [number, number, number];
            const BLACK = [10, 10, 10] as [number, number, number];
            const GRAY = [82, 82, 82] as [number, number, number];
            const LIGHT = [244, 244, 245] as [number, number, number];

            let y = 20;
            const margin = 20;
            const pageWidth = 210;
            const contentWidth = pageWidth - margin * 2;

            // Header band
            doc.setFillColor(...GREEN);
            doc.rect(0, 0, pageWidth, 14, "F");

            // Logo text
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(t("pdf.header") || "AGRÉA AFRICA", margin, 9.5);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.text(t("pdf.website") || "agrea.africa", pageWidth - margin, 9.5, { align: "right" });

            y = 30;

            // Title
            doc.setTextColor(...BLACK);
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text(objective.label, margin, y, { maxWidth: contentWidth });
            y += 10;

            // Subtitle
            doc.setTextColor(...GRAY);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`${t("pdf.sector") || "Secteur :"} ${sector.name}`, margin, y);
            y += 6;
            doc.text(`${t("pdf.generated_on") || "Document généré le"} ${new Date().toLocaleDateString(t("pdf.locale") || "fr-FR", { day: "numeric", month: "long", year: "numeric" })}`, margin, y);
            y += 5;

            // Info boxes
            doc.setFillColor(...LIGHT);
            doc.roundedRect(margin, y, contentWidth / 2 - 4, 14, 2, 2, "F");
            doc.setTextColor(...GRAY);
            doc.setFontSize(7);
            doc.text(t("pdf.est_delay") || "DÉLAI ESTIMÉ", margin + 4, y + 5);
            doc.setTextColor(...BLACK);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text(`${objective.daysMin} – ${objective.daysMax} ${t("pdf.days") || "jours"}`, margin + 4, y + 11);

            const box2x = margin + contentWidth / 2 + 4;
            doc.setFillColor(...LIGHT);
            doc.roundedRect(box2x, y, contentWidth / 2 - 4, 14, 2, 2, "F");
            doc.setTextColor(...GRAY);
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.text(t("pdf.official_cost") || "COÛT OFFICIEL", box2x + 4, y + 5);
            doc.setTextColor(...BLACK);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            const costText = objective.costMin === 0
                ? (t("pdf.official_fees") || "Frais officiels")
                : `${objective.costMin.toLocaleString()} – ${objective.costMax.toLocaleString()} USD`;
            doc.text(costText, box2x + 4, y + 11);

            y += 22;

            // Divider
            doc.setDrawColor(...(LIGHT as [number, number, number]));
            doc.setLineWidth(0.3);
            doc.line(margin, y, pageWidth - margin, y);
            y += 8;

            // Required docs
            const required = documents.filter((d) => d.isRequired);
            const optional = documents.filter((d) => !d.isRequired);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...BLACK);
            doc.text(`${t("pdf.mandatory_docs") || "Documents obligatoires"} (${required.length})`, margin, y);
            y += 8;

            required.forEach((d, idx) => {
                if (y > 265) {
                    doc.addPage();
                    y = 20;
                }

                // Bullet
                doc.setFillColor(...GREEN);
                doc.circle(margin + 3, y - 1.5, 1.5, "F");

                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.setTextColor(...BLACK);
                const nameLines = doc.splitTextToSize(`${idx + 1}. ${d.name}`, contentWidth - 12);
                doc.text(nameLines, margin + 8, y);
                y += nameLines.length * 5;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8.5);
                doc.setTextColor(...GRAY);
                const descLines = doc.splitTextToSize(d.description, contentWidth - 12);
                doc.text(descLines, margin + 8, y);
                y += descLines.length * 4.5;

                if (d.source) {
                    doc.setFontSize(7.5);
                    doc.setTextColor(13, 92, 58);
                    doc.text(`${t("pdf.source") || "Source :"} ${d.source}`, margin + 8, y);
                    y += 4;
                }

                if (d.tip) {
                    doc.setFontSize(7.5);
                    doc.setTextColor(13, 92, 58);
                    const tipLines = doc.splitTextToSize(`${t("pdf.tip") || "Conseil :"} ${d.tip}`, contentWidth - 12);
                    doc.text(tipLines, margin + 8, y);
                    y += tipLines.length * 4;
                }

                y += 4;
            });

            if (optional.length > 0) {
                y += 4;
                doc.setFont("helvetica", "bold");
                doc.setFontSize(11);
                doc.setTextColor(...BLACK);
                doc.text(`${t("pdf.additional_docs") || "Documents complémentaires"} (${optional.length})`, margin, y);
                y += 8;

                optional.forEach((d, idx) => {
                    if (y > 265) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(9.5);
                    doc.setTextColor(...GRAY);
                    const nameLines = doc.splitTextToSize(`${idx + 1}. ${d.name}`, contentWidth - 8);
                    doc.text(nameLines, margin + 4, y);
                    y += nameLines.length * 4.5;

                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(8);
                    const descLines = doc.splitTextToSize(d.description, contentWidth - 8);
                    doc.text(descLines, margin + 4, y);
                    y += descLines.length * 4 + 4;
                });
            }

            // Footer
            const pageCount = (doc as InstanceType<typeof jsPDF> & { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFillColor(...GREEN);
                doc.rect(0, 290, pageWidth, 7, "F");
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(6.5);
                doc.setFont("helvetica", "normal");
                doc.text(`${t("pdf.header") || "AGRÉA AFRICA"} — ${t("pdf.website") || "agrea.africa"} — ${t("pdf.footer_note") || "Cette liste est fournie à titre indicatif. Les exigences officielles peuvent évoluer."}`, margin, 295);
                doc.text(`${t("pdf.page") || "Page"} ${i} / ${pageCount}`, pageWidth - margin, 295, { align: "right" });
            }

            const filename = `Agrea_${objective.id}_${new Date().toISOString().slice(0, 10)}.pdf`;
            doc.save(filename);
        } catch (err) {
            console.error("Erreur génération PDF :", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={loading}
            className="btn-primary"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
        >
            <Download size={16} />
            {loading ? (t("pdf.generating") || "Génération en cours...") : (t("pdf.download") || "Télécharger la liste PDF")}
        </button>
    );
}
