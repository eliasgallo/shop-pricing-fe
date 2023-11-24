export interface LocationStateNewItem {
  store: string
}

export type ShoppingItem = {
  id?: number
  checked: boolean
  name: string
  offer: boolean
  price: number
  price_unit: string
  quantity_type: string
  quantity_value: number
  store: string
  readonly created_at?: string
  readonly updated_at?: string
}

export type ShoppingListType = { [key: string]: ShoppingItem[] }
