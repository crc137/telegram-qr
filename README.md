<div align="center">

# Telegram QR

 <img width="30%" src="https://raw.coonlink.com/cloud/36852eae-81b0-46de-addf-99d17a362304.jpeg" />

A lightweight, self-contained JavaScript library for generating styled QR codes optimized for Telegram. Supports canvas rendering, custom configurations, blue-themed variants, logo overlays, data URLs, and direct downloads.
    
[![npm version](https://badge.fury.io/js/telegram-qr.svg)](https://badge.fury.io/js/telegram-qr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![English](https://img.shields.io/badge/lang-English%20🇺🇸-white)](README.md)
[![Русский](https://img.shields.io/badge/язык-Русский%20🇷🇺-white)](README.ru.md)

<img alt="last-commit" src="https://img.shields.io/github/last-commit/crc137/telegram-qr?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" style="margin: 0px 2px;">
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/crc137/telegram-qr?style=flat&amp;color=0080ff" style="margin: 0px 2px;">
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/crc137/telegram-qr?style=flat&amp;color=0080ff" style="margin: 0px 2px;">
<img alt="version" src="https://img.shields.io/badge/version-1.0.0-blue" style="margin: 0px 2px;">

</div>

## Features

- **Telegram-Styled QR Codes**: Rounded dots and extra-rounded corners for a modern look.
- **Blue Variant**: One-click setup for Telegram's signature blue color scheme.
- **Logo Support**: Easily embed logos or images in the center.
- **Flexible Output**: Generate canvas elements, PNG data URLs, or download images directly.
- **Customizable**: Override defaults for size, colors, margins, and more.
- **ES Modules & CommonJS**: Works in browsers and Node.js environments.
- **Self-Contained**: No external dependencies - everything is bundled.

## Installation

```bash
npm install telegram-qr
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/telegram-qr@1.0.0/dist/index.js"></script>
```

## Quick Start

### Basic Usage (Browser/Node.js)

```javascript
import { createTelegramQR, downloadTelegramQR } from 'telegram-qr';

// Create a QR code instance
const qr = createTelegramQR('https://t.me/yourusername');

// Download as PNG
downloadTelegramQR('https://t.me/yourusername', 'my-telegram-qr');
```

### With Logo

```javascript
import { createTelegramQRWithLogo } from 'telegram-qr';

const qr = createTelegramQRWithLogo('https://t.me/yourusername', 'path/to/logo.png');
```

### Blue Telegram Theme

```javascript
import { createTelegramBlueQR } from 'telegram-qr';

const qr = createTelegramBlueQR('https://t.me/yourusername');
```

## API Reference

### `createTelegramQR(data, options = {})`

Creates a QR code instance with Telegram styling.

- **Parameters**:
  - `data` (string): The data to encode (e.g., Telegram login URL like `https://t.me/yourusername`).
  - `options` (object): Configuration options.
    - `width` (number): QR code width (default: 240).
    - `height` (number): QR code height (default: 240).
    - `dotsOptions` (object): Dot styling (e.g., `{ color: '#000000' }`).
    - `cornersSquareOptions` (object): Corner square styling.
    - `cornersDotOptions` (object): Corner dot styling.
    - `backgroundOptions` (object): Background styling.
    - `imageOptions` (object): Image/logo options (if using `image`).

- **Returns**: `QRCodeStyling` instance (for further manipulation like `append()` to DOM).

**Defaults** (from `TELEGRAM_QR_CONFIG`):
```javascript
{
  width: 240,
  height: 240,
  type: "canvas",
  qrOptions: {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "L"
  },
  dotsOptions: {
    type: "rounded",
    color: "#000000"
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#000000"
  },
  cornersDotOptions: {
    color: "#000000"
  },
  backgroundOptions: {
    color: "#ffffff"
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 1.0,
    margin: 5
  }
}
```

### `createTelegramBlueQR(data, options = {})`

Creates a blue-themed QR code (Telegram's brand color `#0088cc`).

- **Parameters**: Same as `createTelegramQR`.
- **Returns**: `QRCodeStyling` instance.

### `createTelegramQRWithLogo(data, logoUrl, options = {})`

Creates a QR code with a centered logo/image.

- **Parameters**:
  - `data` (string): Data to encode.
  - `logoUrl` (string): URL or path to the logo image.
  - `options` (object): Same as `createTelegramQR`.
- **Returns**: `QRCodeStyling` instance.

### `getTelegramQRDataURL(data, options = {})`

Generates a base64 PNG data URL for the QR code.

- **Parameters**: Same as `createTelegramQR`.
- **Returns**: `Promise<string>` (data URL).

```javascript
const dataUrl = await getTelegramQRDataURL('https://t.me/yourusername');
document.getElementById('qr-container').innerHTML = `<img src="${dataUrl}" />`;
```

### `downloadTelegramQR(data, filename = 'telegram-qr', options = {})`

Downloads the QR code as a PNG file.

- **Parameters**:
  - `data` (string): Data to encode.
  - `filename` (string): Download filename (default: 'telegram-qr').
  - `options` (object): Same as `createTelegramQR`.
- **Returns**: `Promise<void>`.

### `TELEGRAM_QR_CONFIG`

Exported constant with default configuration (see above).

## Examples

### Append to DOM

```javascript
import { createTelegramQR } from 'telegram-qr';

const qr = createTelegramQR('https://t.me/yourusername');
qr.append(document.getElementById('qr-container'));
```

### Custom Styling

```javascript
const qr = createTelegramQR('https://t.me/yourusername', {
  width: 300,
  dotsOptions: { color: '#ff0000' },
  backgroundOptions: { color: '#f0f0f0' }
});
```

### Node.js Usage (Server-Side Generation)

```javascript
const { getTelegramQRDataURL } = require('telegram-qr'); // CommonJS

async function generateQR() {
  const dataUrl = await getTelegramQRDataURL('https://t.me/yourusername');
  // Use dataUrl (e.g., save to file or send in response)
}
generateQR();
```

## Browser Compatibility

- Modern browsers (ES modules supported).
- Device Pixel Ratio (DPR) scaling for high-DPI displays.

## License

MIT © [Coonlink](https://coonlink.com)
