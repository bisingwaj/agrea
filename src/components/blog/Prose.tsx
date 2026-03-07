"use client";

import { ReactNode } from "react";

interface ProseProps {
    children: ReactNode;
}

export default function Prose({ children }: ProseProps) {
    return (
        <div
            className="prose-container"
            style={{
                fontSize: "1.125rem",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                paddingBottom: "64px"
            }}
        >
            <style jsx global>{`
                .prose-container p {
                    margin-bottom: 1.5em;
                }
                .prose-container h2 {
                    font-size: 2rem;
                    fontWeight: 600;
                    color: var(--white);
                    margin-top: 2em;
                    margin-bottom: 1em;
                    letter-spacing: -0.02em;
                }
                .prose-container h3 {
                    font-size: 1.5rem;
                    fontWeight: 600;
                    color: var(--white);
                    margin-top: 1.5em;
                    margin-bottom: 0.75em;
                }
                .prose-container h4 {
                    font-size: 1.25rem;
                    fontWeight: 600;
                    color: var(--white);
                    margin-top: 1.25em;
                    margin-bottom: 0.5em;
                }
                .prose-container ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                    margin-bottom: 1.5em;
                }
                .prose-container ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                    margin-bottom: 1.5em;
                }
                .prose-container li {
                    margin-bottom: 0.5em;
                }
                .prose-container li::marker {
                    color: var(--green-900);
                }
                .prose-container a {
                    color: var(--green-900);
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
                .prose-container a:hover {
                    color: var(--green-800);
                }
                .prose-container strong {
                    color: var(--white);
                    font-weight: 600;
                }
                .prose-container blockquote {
                    border-left: 4px solid var(--green-900);
                    padding-left: 1.5em;
                    font-style: italic;
                    color: var(--text-muted);
                    margin: 2em 0;
                    background: rgba(16, 185, 129, 0.05);
                    padding: 1.5em;
                    border-radius: 0 8px 8px 0;
                }
                /* Images are handled globally or via next/image, but limits are good */
                .prose-container img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 12px;
                    margin: 2em 0;
                }
                /* Table styling for comparison tables */
                .prose-container table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2em 0;
                    font-size: 0.95em;
                }
                .prose-container th {
                    text-align: left;
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.05);
                    color: var(--white);
                    font-weight: 600;
                    border-bottom: 1px solid var(--border);
                }
                .prose-container td {
                    padding: 12px 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .prose-container tr:last-child td {
                    border-bottom: none;
                }
            `}</style>
            {children}
        </div>
    );
}
