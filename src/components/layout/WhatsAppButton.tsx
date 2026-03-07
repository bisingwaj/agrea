"use client";

export default function WhatsAppButton() {
    const WHATSAPP_NUMBER = "243XXXXXXXXX";
    const MESSAGE = encodeURIComponent(
        "Bonjour Agréa, je souhaite obtenir des informations sur vos services de facilitation administrative."
    );

    const whatsAppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

    return (
        <>
            <style>{`
                .whatsapp-float {
                    position: fixed;
                    bottom: 32px; /* Default position */
                    right: 32px;
                    z-index: 90;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: #25D366;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    text-decoration: none;
                }
                .whatsapp-float:hover {
                    transform: scale(1.08);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
                    opacity: 1;
                }
                @media (max-width: 900px) {
                    .whatsapp-float {
                        bottom: 96px; /* Remonter au-dessus de la bottom nav */
                        right: 16px;
                    }
                }
            `}</style>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter Agréa par WhatsApp"
                className="wa-btn"
            >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.102 1.514 5.829L.057 23.785a.5.5 0 0 0 .626.625l5.957-1.457A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.012-1.374l-.359-.213-3.724.911.927-3.626-.234-.372A9.862 9.862 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.387 9.818 9.818 0 5.43-4.387 9.818-9.818 9.818z" />
                </svg>
            </a>
        </>
    );
}
