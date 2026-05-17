# Sudoku Native – Monorepo Project 

Ett modernt Sudoku-spel byggt för Android och iOS med **React Native** och **TypeScript**. Projektet är strukturerat som ett **Turborepo** för att dela logik mellan olika plattformar.

 Live Demo
Testa appen direkt i webbläsaren eller på din mobil via Expo Go:
 [**Klicka här för att öppna Expo Snack Demo**](DIN_LÄNK_HÄR)

---

## 🛠 Teknikstack
- **Framework:** React Native (Expo)
- **Språk:** TypeScript
- **Arkitektur:** Turborepo (Monorepo)
- **Ikoner:** Lucide React Native
- **Styling:** Custom StyleSheet med mörkt tema

## 🏗 Projektstruktur
Eftersom projektet körs i en monorepo är logiken separerad för maximal återanvändning:
- `apps/native`: Huvudappen byggd med Expo.
- `packages/logic`: Delad TypeScript-logik för att generera och validera Sudoku-pussel.
- `packages/ui`: (Förberedd för) Delade UI-komponenter.

- **Generering av pussel:** Skapar unika bräden i tre svårighetsgrader (Lätt, Medel, Svår).
- **Interaktiv spelplan:** Visuell feedback för valda celler och fasta siffror.
- **Timer:** Håller koll på hur snabbt du löser pusslet.
- **Modern Navigation:** Anpassad bottenmeny och popup-modaler för svårighetsgrad.
- **Dark Mode:** Ett genomgående mörkt och stilrent användargränssnitt.

## Kom igång lokalt

1. Klona repot:
   ```sh
   git clone [https://github.com/mattssonmart/Suduko-mono.git]