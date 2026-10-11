import { chromium } from 'playwright-core'

/** Lance le Chromium préinstallé (ou celui indiqué par CHROMIUM_PATH), avec le proxy éventuel. */
export function launch() {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: 'localhost,127.0.0.1' } : undefined
  return chromium.launch({
    executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium',
    proxy,
    args: proxy ? ['--ignore-certificate-errors'] : [],
  })
}
