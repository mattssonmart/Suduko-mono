# Sudoku

Ett modernt Sudoku-spel byggt med **React Native**, **React** och **TypeScript** i en **Turborepo**-monorepo. Finns tillgängligt på både mobil och dator.

🔗 [Spela nu](https://suduko-mono-8k5x.vercel.app/) — automatisk redirect till rätt version baserat på din enhet

---

## Appar

| | |
|---|---|
| [Mobile](https://suduko-mono.vercel.app/) | React Native (Expo) — Android & iOS |
| [Webb](https://suduko-mono-p2gu.vercel.app/) | React — dator |
| [Landing](https://suduko-mono-8k5x.vercel.app/) | Automatisk redirect |

---

## Teknikstack

| | |
|---|---|
| Framework | React Native (Expo) + React (Vite) |
| Språk | TypeScript |
| Arkitektur | Turborepo (Monorepo) |
| Ikoner | Lucide React Native |
| Styling | Custom StyleSheet – mörkt tema |

---

## Projektstruktur

```
apps/
  native/     # Expo-appen (mobil)
  web/        # React-appen (dator)
  landing/    # Landningssida med enhetsdetektering
packages/
  logic/      # Delad logik för generering och validering av pussel
  ui/         # Delade UI-komponenter (förberedd)
```

---

## Funktioner

- Tre svårighetsgrader – Lätt, Medel, Svår
- Interaktiv spelplan med visuell feedback
- Timer
- Bottenmeny och svårighetsväljare
- Mörkt tema
- Automatisk redirect till rätt plattform

---

## Kom igång

```sh
git clone https://github.com/mattssonmart/Suduko-mono.git
cd Suduko-mono
npm install
npm run dev
```