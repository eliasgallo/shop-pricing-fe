import enNs1 from '../translations/locales/en/ns1.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1'
    resources: {
      ns1: typeof enNs1
    }
  }
}
