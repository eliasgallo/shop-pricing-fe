import { ChangeEvent, useState } from 'react'
import { PriceUnitTypes, QuantityTypes, ShoppingItem } from '../store'
import { styled } from 'styled-components'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  width: fit-content;
`

const FormSection = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 20px;
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
  onSave: (item: ShoppingItem) => void
  onCancel: () => void
  onDelete: (item: ShoppingItem) => void
}

export const DetailsShopItemForm: React.FC<ShopItemFormProps> = (props) => {
  const [item, setItem] = useState(props.item)

  return (
    <>
      {!item.id && <h1>Create new item</h1>}
      <FormContainer>
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
          <input
            type='text'
            name='store'
            placeholder='Store'
            value={item.store}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setItem({ ...item, store: e.target.value })
            }
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
            <select
              name='quantity_type'
              value={item.quantity_type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setItem({
                  ...item,
                  quantity_type: e.target.value,
                })
              }
            >
              {Object.keys(QuantityTypes).map((key: string) => {
                return (
                  <option
                    key={key}
                    value={key}
                  >
                    {QuantityTypes[key]}
                  </option>
                )
              })}
            </select>
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
            <select
              name='price_unit'
              value={item.price_unit.toString()}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setItem({
                  ...item,
                  price_unit: e.target.value,
                })
              }
            >
              {Object.keys(PriceUnitTypes).map((key: string) => {
                return (
                  <option
                    key={key}
                    value={key}
                  >
                    {PriceUnitTypes[key]}
                  </option>
                )
              })}
            </select>
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
        <FormSection>
          <button
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              props.onSave(item)
            }}
          >
            Save
          </button>
        </FormSection>
        <FormSection>
          <button
            onClick={(e) => {
              e.preventDefault()
              props.onCancel()
            }}
          >
            Cancel
          </button>
        </FormSection>
        <FormSection>
          <button
            onClick={(e) => {
              e.preventDefault()
              props.onDelete(item)
            }}
          >
            Delete
          </button>
        </FormSection>
      </FormContainer>
    </>
  )
}
