// TODO: should be provided from BE
export const PriceUnitTypes: { [key: string]: string } = {
  krKg: 'kr/kg',
  krL: 'kr/l',
  krUnit: 'kr/st',
  krAction: 'kr/action',
  percentage: '%',
  kr: 'kr',
}

export const QuantityTypes: { [key: string]: string } = {
  kg: 'kg',
  currency: 'kr',
}

export const ComparisonPriceType: { [key: string]: string } = {
  krKg: 'kr/kg',
  krL: 'kr/l',
  krUnit: 'kr/st',
  krAction: 'kr/action',
  percentage: '%',
  kr: 'kr',
}

export const ReliabilityType: { [key: string]: string } = {
  unsure: '?',
  sure: '!',
  old: 'O',
}

export const TagType: { [key: string]: string } = {
  frozen: 'Frozen ❄️',
  ekological: 'Ecological 🌱',
  swe: 'Swedish 🇸🇪',
}

export const TagTypeShort: { [key: string]: string } = {
  frozen: '❄️',
  ekological: '🌱',
  swe: '🇸🇪',
}

export const CategoryType: { [key: string]: string } = {
  animalistic: 'animalistic',
  sausage: 'sausage',
  vegeterian: 'vegeterian',
  fish: 'fish',
  dry: 'dry',
  cereal: 'cereal',
  oil: 'oil',
  beverage: 'beverage',
  carbs: 'carbs',
  snacks: 'snacks',
  fruit: 'fruit',
  greens: 'greens',
  canned: 'canned',
  bread: 'bread',
  dairy: 'dairy',
  sauses: 'sauses',
  hygiene: 'hygiene',
  cleaning: 'cleaning',
  spices: 'spices',
  drink: 'drink',
  others: 'others',
  unknown: 'unknown',
}
