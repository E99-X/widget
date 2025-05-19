# EggX TokenSale Widget

A drop-in React component that lets you embed on-chain TokenSale + Autopilot functionality into any site—no backend required.

---

## 🌐 Deployment

Refer in your script:

```
https://widget.e99x.com/widget.js
```

## ✨ Overview

This widget allows anyone to embed a fully on-chain token sale powered by the EggX protocol directly into any website. It includes:

- Token Sale Widget with live sale and statistics
- Color & avatar customization
- Autopilot integration
- Admin panel auto-detection for deployers
- Sale and Stage management

> You need only to pass:
>
> - `saleId`
> - `avatarUrl`
> - `customColors`
>
> The widget will automatically fetch the token type and AdminCap ID from your wallet if you are recorded as an owner inside the tokenSale and let you manage the sale inside a built-in admin panel.

Token and Token Sale object can be created following the guidelines: [https://github.com/E99-X/user_coin_on_eggx](https://github.com/E99-X/user_coin_on_eggx)

## [🌐 Live Demo](https://e99x.com/)
Try the widget instantly at:


Interact with fully deployed test sales — no setup required.

## 🚀 Installation

```bash
npm install
npm run build
npm run serve
```

## 🌈 Usage

```html
<div id="previewWidget-1"></div>
<script src="https://widget.e99x.com/widget.js"></script>
<script>
  window.TokenSaleWidget({
    customColors: {
      primaryColor: "#ff0000", // Customize as needed
      bgrColor: "#ffffff",
      accentColor: "#00ff00",
    },
    avatarUrl: "https://example.com/avatar.png",
    saleId: "0xYourTokenSaleID",
  });
</script>
```

to populate just add another snipet and assign another id to the container `previewWidget-ID`

## 🔧 Required Constants

Widget uses under the hood `./src/constants/constants.js`:

```js
export const PACKAGE_ID =
  "0x023177c42f5ff2f00de27af9132c17143446df41148c4fd132a2f7569b8fffa0"; // EggX Protocol Package

export const AUTO_PACKAGE_ID =
  "0x8d5a779f3763fe9c1d8a9e2871e103190cf14a7c503fc80dbf00712e8b54e459";// Autopilot Package

export const AUTOPILOT =
  "0xf84f471cb3b61f822579cf594721f37b83a5b964afd521b3adea86b99a9b0e1d";// Shared Autopilot Object
```

These are required for interaction with EggX and Autopilot smart contracts.

---

## 🔄 Behavior

- If the connected wallet is the admin of a tokenSale, the widget exposes admin controls automatically.
- Sale config like tokenType and AdminCapId are auto-injected from chain state.
- Only UI-level config needed: avatar and colors.

## 📷 Screenshots

<img src="https://i.imgur.com/9NDXTYM.jpeg" width="300" style="vertical-align: top;"/> <img src="https://i.imgur.com/T0TgLtx.jpeg" width="300" style="vertical-align: top;"/>

## 📄 License

© 2025 EggX. All rights reserved

---

Built for autopilot-powered TokenSales on Sui by the EggX team.
