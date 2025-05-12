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

## 🌐 Live Demo

Try the widget instantly at:

```
https://e99x.com/
```

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
  "0x34218f8b8ed94c0c89bdf312188a612a9f9b2b4db6c70ff9c85e1ff52ea973c0"; // EggX Protocol Package

export const AUTO_PACKAGE_ID =
  "0xd884f7edb4b8b2fcacccc256673901d095873471bc95c1b1e9f9f0748ce28af2"; // Autopilot Package

export const AUTOPILOT =
  "0xb330c1f81a15bbf76b8c41906caa42808229be75d959b03335de5dfa27e0d5ad"; // Shared Autopilot Object
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
