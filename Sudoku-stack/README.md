# Sudoku Native

Ett modernt Sudoku-spel för Android och iOS byggt med **React Native**, **Expo** och **TypeScript** i en **Turborepo**-monorepo.

🔗 [Live demo](https://suduko-mono.vercel.app/)

---

## Teknikstack

| | |
|---|---|
| Framework | React Native (Expo) |
| Språk | TypeScript |
| Arkitektur | Turborepo (Monorepo) |
| Ikoner | Lucide React Native |
| Styling | Custom StyleSheet – mörkt tema |

---

## Projektstruktur

```
apps/
  native/       # Expo-appen
packages/
  logic/        # Delad logik för generering och validering av pussel
  ui/           # Delade UI-komponenter (förberedd)
```

---

## Funktioner

- Tre svårighetsgrader – Lätt, Medel, Svår
- Interaktiv spelplan med visuell feedback
- Timer
- Bottenmeny och svårighetsväljare
- Mörkt tema

---

## Kom igång

```sh
git clone https://github.com/mattssonmart/Suduko-mono.git
cd Suduko-mono
npm install
npm run dev
```