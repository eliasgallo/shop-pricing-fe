// Shopping
export type ShopItem = {
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

// Price control
export type PriceItem = {
  id?: number
  name: string
  readonly created_at?: string
  readonly updated_at?: string
  comparison_price: number
  comparison_price_unit: string
  reliability: string
  category: string
  tags: string[]
}
