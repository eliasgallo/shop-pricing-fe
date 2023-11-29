import { ChangeEvent, useState } from 'react'
import { PriceUnitTypes, QuantityTypes } from '../store'
import { styled } from 'styled-components'
import { ShoppingItem } from '../types'
import { InputWithSuggestions } from './shared/InputWithSuggestions'
import { SelectorComponent } from './shared/SelectorComponent'

const FormContainer = styled.form`
  display: grid;
  gap: 20px;
  margin-right: auto;
  margin-left: auto;
  width: fit-content;
`

const InputSelectWrapper = styled.div`
  display: flex;
  select {
    flex-grow: 1;
    text-align: center;
    margin-left: 10px;
  }
`

export type ShopItemFormProps = {
  item: ShoppingItem
  isNewItem: boolean
  onSave: (item: ShoppingItem) => void
  onCancel: () => void
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
          <InputSelectWrapper>
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
          </InputSelectWrapper>
        </label>
        <label>
          Price
          <InputSelectWrapper>
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
          </InputSelectWrapper>
        </label>
        <label>
          Offer? 🔖
          <input
            type='checkbox'
            name='offer'
            placeholder='Offer?'
            checked={item.offer}
            onChange={() => setItem({ ...item, offer: !item.offer })}
          />
        </label>
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={props.onCancel}
        >
          Cancel
        </button>
        {!props.isNewItem && (
          <button
            type='button'
            onClick={props.onDelete}
          >
            Delete
          </button>
        )}
      </FormContainer>
    </>
  )
}
