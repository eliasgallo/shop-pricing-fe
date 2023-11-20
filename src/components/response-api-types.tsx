export type ShoppingItemType = {
  id: number
  checked: boolean
  name: string
  offer: number
  price: number
  price_unit: string
  quantity_type: string
  quantity_value: number
  store: string
  created_at: string
  updated_at: string
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