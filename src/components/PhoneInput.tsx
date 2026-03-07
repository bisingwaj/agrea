"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/data/countries";
import Image from "next/image";

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

// Masques de formatage par défaut pour certains pays clés
const PHONE_FORMATS: Record<string, string> = {
    "CD": "00 000 0000",   // RDC: 9 chiffres (81 123 4567)
    "FR": "0 00 00 00 00", // France: 9 chiffres après le 0 (06 12 34 56 78)
    "BE": "000 00 00 00",  // Belgique
    "US": "(000) 000-0000",// USA
    "CN": "000 0000 0000", // Chine
};

export default function PhoneInput({ value, onChange, placeholder = "Numéro de téléphone", required = false }: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    // RDC par défaut (+243)
    const [selectedCountry, setSelectedCountry] = useState(() => {
        return COUNTRIES.find(c => c.code === "CD") || COUNTRIES[0];
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fonction de formatage
    const formatNumber = (input: string, countryCode: string) => {
        const numbers = input.replace(/\D/g, "");
        const format = PHONE_FORMATS[countryCode] || "000 000 000 000"; // Masque générique long

        let result = "";
        let numberIdx = 0;

        for (let i = 0; i < format.length && numberIdx < numbers.length; i++) {
            if (format[i] === "0") {
                result += numbers[numberIdx];
                numberIdx++;
            } else {
                result += format[i];
            }
        }

        return result;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatNumber(rawValue, selectedCountry.code);
        setPhoneNumber(formattedValue);
    };

    // Réinitialiser le numéro si on change de pays (optionnel, mais souvent préférable pour éviter les erreurs de format)
    const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
        setSelectedCountry(country);
        setPhoneNumber(""); // On vide pour forcer le nouveau formatage
        setIsOpen(false);
        setSearch("");
    };

    // Initialiser depuis la valeur externe si nécessaire
    useEffect(() => {
        if (value && value !== `${selectedCountry.dial_code} ${phoneNumber}`) {
            // Logique basique: on ne parse pas dynamiquement l'indicatif depuis value pour l'instant 
            // pour rester simple et robuste. On laisse l'utilisateur gérer.
        }
    }, [value]);

    useEffect(() => {
        onChange(`${selectedCountry.dial_code} ${phoneNumber}`);
    }, [selectedCountry, phoneNumber]);

    // Fermer le dropdown au clic à l'extérieur
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dial_code.includes(search)
    );

    return (
        <div style={{ position: "relative", width: "100%" }} ref={dropdownRef}>
            <div style={{
                display: "flex",
                alignItems: "stretch",
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s"
            }}
                onFocusCapture={(e) => {
                    e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(16, 185, 129, 0.3)";
                }}
                onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.boxShadow = "none";
                    }
                }}
            >
                {/* Sélecteur de pays */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "14px 16px",
                        borderRight: "1px solid var(--border)",
                        background: "transparent",
                        cursor: "pointer",
                        flexShrink: 0,
                        outline: "none"
                    }}
                >
                    <img
                        src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                        alt={selectedCountry.code}
                        style={{ width: "20px", height: "auto", borderRadius: "2px" }}
                    />
                    <span style={{ color: "var(--white)", fontSize: "14px", fontWeight: 500 }}>{selectedCountry.dial_code}</span>
                    <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
                </button>

                {/* Champ input */}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={placeholder}
                    required={required}
                    style={{
                        flex: 1,
                        background: "transparent",
                        color: "var(--white)",
                        padding: "14px 16px",
                        outline: "none",
                        fontSize: "14px",
                        width: "100%",
                        border: "none"
                    }}
                />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{
                    position: "absolute",
                    zIndex: 50,
                    marginTop: "6px",
                    width: "100%",
                    maxHeight: "300px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                }}>
                    {/* Barre de recherche */}
                    <div style={{ padding: "10px", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ position: "relative" }}>
                            <Search size={14} style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--text-muted)"
                            }} />
                            <input
                                type="text"
                                placeholder="Rechercher un pays ou indicatif..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                                style={{
                                    width: "100%",
                                    background: "var(--bg-main)",
                                    color: "var(--white)",
                                    fontSize: "13px",
                                    borderRadius: "8px",
                                    paddingLeft: "36px",
                                    paddingRight: "12px",
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    outline: "none",
                                    border: "1px solid var(--border)",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>
                    </div>

                    {/* Liste des pays */}
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "10px 16px",
                                        background: selectedCountry.code === country.code ? "rgba(255,255,255,0.04)" : "transparent",
                                        borderLeft: selectedCountry.code === country.code ? "2px solid var(--green-900)" : "2px solid transparent",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "background 0.15s"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                                    onMouseOut={(e) => e.currentTarget.style.background = selectedCountry.code === country.code ? "rgba(255,255,255,0.04)" : "transparent"}
                                >
                                    <img
                                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                        alt={country.name}
                                        style={{ width: "20px", height: "auto", borderRadius: "2px", flexShrink: 0 }}
                                    />
                                    <span style={{ color: "var(--white)", fontSize: "13px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{country.name}</span>
                                    <span style={{ color: "var(--text-muted)", fontSize: "13px", flexShrink: 0 }}>{country.dial_code}</span>
                                </button>
                            ))
                        ) : (
                            <div style={{ padding: "24px 16px", textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
                                Aucun pays trouvé
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
