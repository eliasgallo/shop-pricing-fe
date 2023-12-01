import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Spinner } from '../shared/Spinner'
import { PriceUnitTypes, QuantityTypes, ShopItem } from '../../types'
import { FormContainer, SelectorWrapper } from '../shared/SharedElements'
import { InputWithSuggestions } from '../shared/InputWithSuggestions'
import { SelectorComponent } from '../shared/SelectorComponent'
import { CheckboxComponent } from '../shared/CheckboxComponent'
import { ChangeEvent, useState } from 'react'

type ShopItemDetailsProps = {
  shopItem: ShopItem
  loading: boolean
  error: null | string
  storeSuggestions: string[]
  onSave: (item: ShopItem) => void
  onDelete: (item: ShopItem) => void
}

export const ShopItemDetailsContainer: React.FC<ShopItemDetailsProps> = ({
  shopItem,
  loading,
  error,
  storeSuggestions,
  onSave,
  onDelete,
}) => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const [item, setItem] = useState(shopItem)

  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault()
          onSave(item)
          navigateBack()
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
          suggestions={storeSuggestions}
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
          onClick={() => {
            onDelete(item)
            navigateBack()
          }}
        >
          Delete
        </button>
      </FormContainer>
      {error && `Error message: ${error}`}
      {loading && <Spinner />}
    </>
  )
}
