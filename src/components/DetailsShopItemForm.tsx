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

const FormSection = styled.div`
  flex-direction: column;
  display: flex;
`

const InputSelectWrapper = styled.div`
  display: flex;
  select {
    flex-grow: 1;
    text-align: center;
  }
`

const OfferWrapper = styled.label``

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
        <FormSection>
          <input
            type='text'
            name='name'
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
        </FormSection>
        <FormSection>
          <label>Quantity</label>
          <InputSelectWrapper>
            <input
              type='number'
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
        </FormSection>
        <FormSection>
          <label>Price</label>
          <InputSelectWrapper>
            <input
              type='number'
              placeholder='price'
              min={0}
              value={item.price || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setItem({ ...item, price: parseInt(e.target.value) })
              }
            />
            <SelectorComponent
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
        </FormSection>
        <FormSection>
          <OfferWrapper>
            Offer? 🔖
            <input
              type='checkbox'
              name='offer'
              placeholder='Offer?'
              checked={item.offer}
              onChange={() => setItem({ ...item, offer: !item.offer })}
            />
          </OfferWrapper>
        </FormSection>
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
