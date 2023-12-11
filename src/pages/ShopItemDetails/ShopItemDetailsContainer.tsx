import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Spinner } from '@shared/Spinner'
import { PriceUnitTypes, QuantityTypes, ShopItem } from '@types'
import { FormContainer, SelectorWrapper } from '../SharedElements'
import { InputWithSuggestions } from '@shared/InputWithSuggestions'
import { SelectorComponent } from '@shared/SelectorComponent'
import { CheckboxComponent } from '@shared/CheckboxComponent'
import { ChangeEvent, useState } from 'react'
import { DecimalInput } from '@shared/DecimalInput'

type ShopItemDetailsProps = {
  shopItem: ShopItem
  loading: boolean
  error: null | string
  storeSuggestions: string[]
  onSave: (item: ShopItem) => void
  onDelete: (item: ShopItem) => void
}

export const ShopItemDetailsContainer = ({
  shopItem,
  loading,
  error,
  storeSuggestions,
  onSave,
  onDelete,
}: ShopItemDetailsProps): JSX.Element => {
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
            <DecimalInput
              decimals={2}
              name='price'
              startValue={item.price}
              valueChanged={(newValue: number) =>
                setItem({ ...item, price: newValue })
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
