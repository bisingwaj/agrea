"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// Assuming locales will be created
import { fr } from "../locales/fr";
import { en } from "../locales/en";
import { zh } from "../locales/zh";

export type LocaleKey = "FR" | "EN" | "ZH";
type LocaleData = any;

const dictionaries: Record<LocaleKey, LocaleData> = {
    FR: fr,
    EN: en,
    ZH: zh,
};

interface I18nContextType {
    lang: LocaleKey;
    setLang: (lang: LocaleKey) => void;
    t: (key: string, variables?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<LocaleKey>("FR");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem("agrea_lang") as LocaleKey;
        if (storedLang && ["FR", "EN", "ZH"].includes(storedLang)) {
            setLangState(storedLang);
        } else {
            // Détection automatique de la langue du navigateur/système
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith("zh")) {
                setLangState("ZH");
                localStorage.setItem("agrea_lang", "ZH");
            } else if (browserLang.startsWith("en")) {
                setLangState("EN");
                localStorage.setItem("agrea_lang", "EN");
            } else {
                // Par défaut en zone francophone ou autre
                setLangState("FR");
                localStorage.setItem("agrea_lang", "FR");
            }
        }
        setMounted(true);
    }, []);

    const setLang = (newLang: LocaleKey) => {
        setLangState(newLang);
        localStorage.setItem("agrea_lang", newLang);
    };

    const t = (path: string, variables?: Record<string, string | number>): string => {
        const keys = path.split(".");
        let current: any = dictionaries[lang];

        for (const key of keys) {
            if (current[key] === undefined) {
                // Fallback to FR
                let fallback: any = dictionaries["FR"];
                for (const k of keys) {
                    if (fallback && fallback[k] !== undefined) {
                        fallback = fallback[k];
                    } else {
                        return path;
                    }
                }
                current = fallback;
                break;
            }
            current = current[key];
        }

        if (typeof current !== "string") return path;

        let result = current;
        if (variables) {
            for (const [key, value] of Object.entries(variables)) {
                result = result.replace(new RegExp(`{{${key}}}`, "g"), String(value));
            }
        }
        return result;
    };

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            <div style={{ visibility: mounted ? "visible" : "hidden" }}>
                {children}
            </div>
        </I18nContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
};
