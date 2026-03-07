import { fr } from "@/locales/fr";

export function tServer(path: string): string {
    const keys = path.split(".");
    let current: any = fr;

    for (const key of keys) {
        if (!current || current[key] === undefined) return path;
        current = current[key];
    }

    return typeof current === "string" ? current : path;
}
