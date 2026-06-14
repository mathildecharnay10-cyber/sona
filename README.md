# Sona — Landing page

SaaS fintech B2B : relances de factures automatiques + pilotage de trésorerie
(indépendants, agences, PME).

## Fichiers
- `index.html` — structure de la page
- `styles.css` — tous les styles (design system, dark premium, responsive, animations)
- `script.js` — interactions (révélations au scroll, compteurs, FAQ, parallax, dashboard animé)

Les 3 fichiers doivent rester dans le même dossier.

## Lancer en local
Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
npx serve .
# puis ouvrir l'URL affichée (ex. http://localhost:3000)
```

Polices chargées via Fontshare (Satoshi) — connexion internet requise au 1er chargement.

## Notes
- CTA unique récurrent : « Démarrer gratuitement » (essai sans carte).
- Le dashboard du hero s'anime à l'arrivée (courbe, compteurs, factures, statut qui passe en « Encaissée »).
- `../sona.html` est la version tout-en-un (un seul fichier), pratique à partager.
