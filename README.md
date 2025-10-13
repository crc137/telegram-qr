# telegram-qr

A JavaScript library for generating Telegram-specific QR codes, leveraging the `qrcode-styling` library.

## Key Features & Benefits

*   **Customizable QR Code Styling:** Utilize the `qrcode-styling` library for advanced customization options.
*   **Telegram Optimized:** Pre-configured with settings suitable for use with Telegram bot integrations or linking directly to Telegram profiles/bots.
*   **Easy Integration:** Simple to integrate into Node.js projects.
*   **Lightweight:** Minimal dependencies and a small footprint.

## Prerequisites & Dependencies

*   Node.js (v14 or higher)
*   npm or yarn

## Installation & Setup Instructions

1.  **Install the package:**

    ```bash
    npm install telegram-qr
    # or
    yarn add telegram-qr
    ```

2.  **Import the library:**

    ```javascript
    import { TELEGRAM_QR_CONFIG } from 'telegram-qr';
    ```

## Usage Examples & API Documentation

The library exports a default configuration object (`TELEGRAM_QR_CONFIG`) which can be used directly or modified to suit your needs.  It depends on `qrcore.js`, which provides a modified `qrcode-styling` component.  The primary usage is to generate a QR code that links to a Telegram resource (user, bot, etc.).

**Example: Generating a QR code as a data URL**

```javascript
import { TELEGRAM_QR_CONFIG } from 'telegram-qr';
import QRCodeStyling from 'qrcode-styling'; // or your preferred qrcode library

async function generateTelegramQR(telegramLink) {
    const qrCode = new QRCodeStyling({
        ...TELEGRAM_QR_CONFIG, // Start with the default Telegram config
        data: telegramLink,
    });

    return await qrCode.getBase64();
}

// Example usage:
async function main() {
    const telegramLink = "https://t.me/your_telegram_bot";
    const qrCodeDataURL = await generateTelegramQR(telegramLink);
    console.log(qrCodeDataURL); // You can then display this data URL as an image
}

main();
```

**Explanation:**

1.  We import `TELEGRAM_QR_CONFIG` from the `telegram-qr`.
2.  We create a new `QRCodeStyling` instance.
3.  We override the `data` property with the desired Telegram link.
4.  We use the `getBase64()` method to generate a data URL for the QR code image.
5.  The resulting `qrCodeDataURL` can be used directly in an `<img>` tag, or processed further as needed.

**Note:** `qrcore.js` seems to be a customized version of `qrcode-styling`. If you prefer to use standard `qrcode-styling`, install it separately and adapt the example above. You might need to adapt the default configuration to align with telegram requirements.

## Configuration Options

The `TELEGRAM_QR_CONFIG` object provides the following configurable options:

| Option                 | Type     | Description                                                                                                        | Default Value                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `width`                | number   | Width of the QR code in pixels.                                                                                     | `240`                                                                                    |
| `height`               | number   | Height of the QR code in pixels.                                                                                    | `240`                                                                                    |
| `type`                 | string   | The output type of the QR code (`canvas`, `svg`, etc.).                                                              | `"canvas"`                                                                               |
| `qrOptions`            | object   | Options for the QR code generation itself (e.g., error correction level).                                           | `{ typeNumber: 0, mode: "Byte", errorCorrectionLevel: "L" }`                               |
| `dotsOptions`          | object   | Options for styling the dots of the QR code.                                                                      | `{ type: "rounded", color: "#000000" }`                                                  |
| `cornersSquareOptions` | object   | Options for styling the square corners of the QR code.                                                             | `{ type: "extra-rounded", color: "#000000" }`                                             |
| `cornersDotOptions`    | object   | Options for styling the dots within the corners of the QR code.                                                    | `{ color: "#000000" }`                                                                    |
| `backgroundOptions`    | object   | Options for styling the background of the QR code.                                                                | `{ color: "#ffffff" }`                                                                    |
| `imageOptions`         | object   | Options for embedding an image within the QR code (Refer to qrcode-styling library for available options)           | (See `index.js` -  likely image URL, width, height, exc.)                              |

You can modify these options by spreading the `TELEGRAM_QR_CONFIG` object and overriding the properties you wish to change, as shown in the example above.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request to the main branch.

Please follow the existing code style and include relevant tests.

## License Information

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  *(Note: No LICENSE file was provided. You should create one and specify the proper MIT License)*

## Acknowledgments

*   This library utilizes the excellent [qrcode-styling](https://github.com/yuanqing/qrcode-styling) library.
