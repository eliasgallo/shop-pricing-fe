import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enNs1 from './locales/en/ns1.json'
import svNs1 from './locales/sv/ns1.json'

use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    defaultNS: 'ns1',
    resources: {
      en: { ns1: enNs1 },
      sv: { ns1: svNs1 },
    },
  })

/* eslint-disable @typescript-eslint/no-unused-vars */
function _expectNoCompilationErrorBlock() {
  type enType = typeof enNs1
  type svType = typeof svNs1
  const _enSv: enType = {} as svType
  const _svEn: svType = {} as enType
}
/* eslint-enable @typescript-eslint/no-unused-vars */
