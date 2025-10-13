import { q } from './qrcore.js';

const QRCodeStyling = q.default;

export const TELEGRAM_QR_CONFIG = {
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
};

export function createTelegramQR(data, options = {}) {
  const dpr = (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1;
  
  const config = {
    ...TELEGRAM_QR_CONFIG,
    width: (options.width || TELEGRAM_QR_CONFIG.width) * dpr,
    height: (options.height || TELEGRAM_QR_CONFIG.height) * dpr,
    data,
    ...options
  };
  
  if (options.dotsOptions) {
    config.dotsOptions = { ...TELEGRAM_QR_CONFIG.dotsOptions, ...options.dotsOptions };
  }
  if (options.cornersSquareOptions) {
    config.cornersSquareOptions = { ...TELEGRAM_QR_CONFIG.cornersSquareOptions, ...options.cornersSquareOptions };
  }
  if (options.cornersDotOptions) {
    config.cornersDotOptions = { ...TELEGRAM_QR_CONFIG.cornersDotOptions, ...options.cornersDotOptions };
  }
  if (options.backgroundOptions) {
    config.backgroundOptions = { ...TELEGRAM_QR_CONFIG.backgroundOptions, ...options.backgroundOptions };
  }
  if (options.imageOptions) {
    config.imageOptions = { ...TELEGRAM_QR_CONFIG.imageOptions, ...options.imageOptions };
  }
  
  return new QRCodeStyling(config);
}

export function createTelegramBlueQR(data, options = {}) {
  const telegramBlue = "#0088cc";
  
  return createTelegramQR(data, {
    ...options,
    dotsOptions: {
      ...options.dotsOptions,
      color: telegramBlue
    },
    cornersSquareOptions: {
      ...options.cornersSquareOptions,
      color: telegramBlue
    },
    cornersDotOptions: {
      ...options.cornersDotOptions,
      color: telegramBlue
    }
  });
}

export function createTelegramQRWithLogo(data, logoUrl, options = {}) {
  return createTelegramQR(data, {
    ...options,
    image: logoUrl,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 1.0,
      margin: 5,
      ...options.imageOptions
    }
  });
}

export async function getTelegramQRDataURL(data, options = {}) {
  const qr = createTelegramQR(data, options);
  const blob = await qr.getRawData('png');
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export async function downloadTelegramQR(data, filename = 'telegram-qr', options = {}) {
  const qr = createTelegramQR(data, options);
  await qr.download({ name: filename, extension: 'png' });
}

export default {
  createTelegramQR,
  createTelegramBlueQR,
  createTelegramQRWithLogo,
  getTelegramQRDataURL,
  downloadTelegramQR,
  TELEGRAM_QR_CONFIG
};
