import { NextRequest, NextResponse } from "next/server";

interface RecallBody {
    firstName: string;
    whatsapp: string;
    timeSlot: string;
    source?: string;
    sector?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: RecallBody = await req.json();

        const { firstName, whatsapp, timeSlot } = body;

        if (!firstName?.trim() || !whatsapp?.trim() || !timeSlot?.trim()) {
            return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
        }

        if (!/^\+?[\d\s\-]{8,}$/.test(whatsapp)) {
            return NextResponse.json({ error: "Numéro WhatsApp invalide." }, { status: 400 });
        }

        // Log to console (to be replaced with Supabase insert when configured)
        console.log("[AGREA] Nouvelle demande de rappel:", {
            nom: firstName,
            whatsapp,
            plage: timeSlot,
            source: body.source ?? "contact",
            secteur: body.sector ?? "non précisé",
            timestamp: new Date().toISOString(),
        });

        // TODO (Phase 2): Insert into Supabase recall_requests table
        // const { error } = await supabaseAdmin.from("recall_requests").insert({...});

        // TODO (Phase 2): Send WhatsApp notification to Agréa team via WhatsApp Business API

        return NextResponse.json(
            {
                success: true,
                message: `Demande enregistrée. ${firstName}, un conseiller vous contactera sur le ${whatsapp} entre ${timeSlot}.`,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("[AGREA] Erreur API recall:", err);
        return NextResponse.json({ error: "Erreur serveur. Réessayez dans quelques instants." }, { status: 500 });
    }
}
