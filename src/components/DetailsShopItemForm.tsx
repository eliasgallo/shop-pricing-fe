import { ChangeEvent, useState } from 'react'
import { PriceUnitTypes, QuantityTypes } from '../store'
import { ShoppingItem } from '../types'
import { InputWithSuggestions } from './shared/InputWithSuggestions'
import { SelectorComponent } from './shared/SelectorComponent'
import { CheckboxComponent } from './shared/CheckboxComponent'
import { FormContainer, SelectorWrapper } from './shared/SharedElements'

export type ShopItemFormProps = {
  item: ShoppingItem
  isNewItem: boolean
  onSave: (item: ShoppingItem) => void
  onDelete: () => void
  storeSuggestions: string[]
}

export const DetailsShopItemForm: React.FC<ShopItemFormProps> = (props) => {
  const [item, setItem] = useState(props.item)

  return (
    <>
      {props.isNewItem && <h1>Create new item</h1>}
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault()
          props.onSave(item)
        }}
      >
        <input
          type='text'
          name='shop_item_name'
          placeholder='Name'
          value={item.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, name: e.target.value })
          }
        />
        <InputWithSuggestions
          suggestions={props.storeSuggestions}
          currentValue={item.store}
          onChange={(value) => setItem({ ...item, store: value })}
          inputPlaceholder='Store'
        />
        <label>
          Quantity
          <SelectorWrapper>
            <input
              type='number'
              name='quantity'
              placeholder='quantity'
              min={0}
              value={item.quantity_value || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setItem({
                  ...item,
                  quantity_value: parseInt(e.target.value) || 0,
                })
              }
            />
            <SelectorComponent
              name='quantity_type'
              allValues={QuantityTypes}
              selectedValue={item.quantity_type}
              onChange={(value) =>
                setItem({
                  ...item,
                  quantity_type: value,
                })
              }
            />
          </SelectorWrapper>
        </label>
        <label>
          Price
          <SelectorWrapper>
            <input
              type='number'
              name='price'
              placeholder='price'
              min={0}
              value={item.price || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setItem({ ...item, price: parseInt(e.target.value) })
              }
            />
            <SelectorComponent
              name='price'
              allValues={PriceUnitTypes}
              selectedValue={item.price_unit}
              onChange={(value) =>
                setItem({
                  ...item,
                  price_unit: value,
                })
              }
            />
          </SelectorWrapper>
        </label>
        <CheckboxComponent
          label='Offer? 🔖'
          isChecked={item.offer}
          onChange={() => setItem({ ...item, offer: !item.offer })}
        />
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={props.onDelete}
        >
          Delete
        </button>
      </FormContainer>
    </>
  )
}
