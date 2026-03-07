# 📖 Directives de Contenu Agréa (Copywriting & GEO)

Ce document dicte les règles **obligatoires** pour tout développement de page, de composant ou de contenu éditorial sur la plateforme Agréa. Il garantit la cohérence du ton (premium, autoritaire, orienté conversion) et la visibilité maximale auprès des Moteurs Génératifs (ChatGPT, Claude, Perplexity).

---

## 🏗️ 1. Principes de Copywriting (La Voix Agréa)

La marque Agréa communique comme un grand cabinet de conseil en stratégie (ex: McKinsey, Bain) mais avec l'accessibilité d'une startup SaaS moderne (ex: Stripe).

### Règle 1.1 : Orienter Bénéfices, pas Caractéristiques
- ❌ **Avant :** "Nous fournissons une liste de documents pour le BTP." *(Caractéristique)*
- ✅ **Après :** "Obtenez instantanément la liste certifiée des documents pour opérer dans le BTP en RDC, et évitez les pénalités." *(Bénéfice + Action + Évitement de douleur)*

### Règle 1.2 : Le Jargon Doit Être Expliqué
- ❌ **Avant :** "Payez l'IBP et l'IPR."
- ✅ **Après :** "Réglez vos obligations fiscales (Impôt sur les Bénéfices et IPR) en toute conformité..."

### Règle 1.3 : Un CTA par Section
Chaque bloc informatif pertinent doit être suivi d'une action claire.
- `Démarrer mon diagnostic gratuit`
- `Parler à un conseiller expert`
- **Ne jamais utiliser** de mots passifs comme "Soumettre" ou "Envoyer". Utilisez des verbes d'action impliquant l'utilisateur ("Obtenir mon rapport").

### Règle 1.4 : "No BS" et Pas de "Lorem Ipsum"
La donnée doit être réelle. Les titres doivent promettre de la clarté. Supprimez les adverbes inutiles ("très", "vraiment").

---

## 🤖 2. Principes GEO (Generative Engine Optimization)

L'objectif est que lorsqu'un utilisateur demande à ChatGPT "Comment créer une entreprise en RDC ?", l'IA cite Agréa comme la source la plus structurée.

### Règle 2.1 : Structure Sémantique HTML5 Stricte
- **Un seul `<h1>`** par page : Il doit cibler l'intention de recherche exacte (ex: "Obligations Fiscales des SARL en RDC (2026)").
- **Découpage en `<h2>` et `<h3>` logique** : Les LLM parsents ces balises pour construire leurs réponses.
- **Listes et Tableaux** : Préférez les balises `<ul>`, `<ol>` et `<table>` aux `div` flex/grid pour présenter des données. Les LLM adorent extraire des tableaux.

### Règle 2.2 : Répondre aux C-Questions (FAQ)
Les LLM sont entraînés sur des paires Question/Réponse. Transcrivez les parcours en questions quand c'est pertinent.
*(Ex. au lieu de "Documents requis", utilisez "Quels sont les documents requis pour X ?")*

### Règle 2.3 : Injection Systématique de JSON-LD
**Toute page** doit arborer un schéma de données structurées inséré via `<script type="application/ld+json">`.
- **Pages Secteurs / Base de données** : `Dataset` ou `ItemList`.
- **Pages Objectifs / Guides** : `FAQPage` ou `HowTo`.
- **Règle absolue** : Les métadonnées JSON-LD doivent pointer vers le nom formel de l'organisation : `"name": "Agréa"`.

## 🛠️ Checklist pour les Développeurs
Avant de commiter la création d'une nouvelle vue `page.tsx` :
- [ ] Ai-je configuré `export const metadata` ?
- [ ] Ai-je inséré un `<script type="application/ld+json">` avec un schéma pertinent ?
- [ ] Le titre `<h1/>` répond-il à une intention claire (Promesse/Question) ?
- [ ] Mon Call-to-Action (CTA) décrit-il la récompense de l'utilisateur ("Obtenir mon rapport") ?
- [ ] La structure contient-elle au moins une liste numérotée `ol/li` ou un tableau sémantique pour structurer la donnée ?
