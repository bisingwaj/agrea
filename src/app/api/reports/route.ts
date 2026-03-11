import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Le payload attendu est :
        // { diagnosticData, scoringResult, source }
        
        // Log to console en attendant la vraie DB (Supabase/Firebase)
        console.log("[AGREA DB_SIMULATOR] Nouveau rapport prêt à être exporté :", {
            societe: body.diagnosticData?.companyName || "Non spécifié",
            contact: body.diagnosticData?.contactName || "Anonyme",
            telephone: body.diagnosticData?.contactPhone || "Non spécifié",
            secteur: body.diagnosticData?.sector,
            ville: body.diagnosticData?.city,
            score: body.scoringResult?.score || 0,
            gaps: body.scoringResult?.gaps?.length || 0,
            timestamp: new Date().toISOString(),
        });

        // TODO (Phase 2): Insert into database table "reports"
        // const { error } = await supabaseAdmin.from("reports").insert({
        //     company_name: body.diagnosticData?.companyName,
        //     contact_name: body.diagnosticData?.contactName,
        //     score: body.scoringResult?.score,
        //     raw_data: body
        // });

        return NextResponse.json(
            { success: true, message: "Rapport sauvegardé (Simulation)." },
            { status: 201 }
        );
    } catch (err) {
        console.error("[AGREA] Erreur API reports:", err);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}
