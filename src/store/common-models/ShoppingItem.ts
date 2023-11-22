// TODO: get it from backend and just handle as strings?!

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

export interface ShoppingItem {
  id?: number
  checked: boolean
  name: string
  offer: boolean
  price: number
  price_unit: string
  quantity_type: string
  quantity_value: number
  store?: string
  readonly created_at?: string
  readonly updated_at?: string
}

export const NewShoppingItem: ShoppingItem = {
  checked: false,
  name: '',
  offer: true,
  price: 0,
  price_unit: PriceUnitTypes.krUnit,
  quantity_type: QuantityTypes.kg,
  quantity_value: 0,
  store: '',
}

// TODO
// declare module 'myTypes' {
//   type UserType = {
//     dob: string,
//     firstName: string,
//     userBio: string,
//   };

//   interface UserProps {
//     user: UserType,
//   }
// }

// module.exports = {
//   UserType,
//   UserProps,
// };
//https://dev.to/mconner89/passing-props-in-react-using-typescript-20lm
