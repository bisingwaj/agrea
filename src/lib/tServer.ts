import { cookies } from "next/headers";
import { fr } from "@/locales/fr";
import { en } from "@/locales/en";
import { zh } from "@/locales/zh";

const dictionaries: any = { FR: fr, EN: en, ZH: zh };

/**
 * Lit le cookie "agrea_lang" côté serveur et renvoie la fonction `tServer`
 * prête à traduire dynamiquement pour le Server Component (FR par défaut).
 */
export async function getTranslationContext() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("agrea_lang")?.value || "FR";

    return function tServer(path: string): string {
        const keys = path.split(".");
        let current: any = dictionaries[lang] || fr;
        let fallback: any = fr;

        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                // Try fallback to FR
                let tempFallback = fallback;
                for (const k of keys) {
                    if (tempFallback && tempFallback[k] !== undefined) {
                        tempFallback = tempFallback[k];
                    } else {
                        return path;
                    }
                }
                current = tempFallback;
                break;
            }
        }

        return typeof current === "string" ? current : path;
    };
}
