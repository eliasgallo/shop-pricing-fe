import { useNavigation } from '@customHooks/routerDomHooks'
import { Spinner } from '@shared/Spinner'
import { InputWithSuggestions } from '@shared/InputWithSuggestions'
import { SelectorComponent } from '@shared/SelectorComponent'
import { CheckboxComponent } from '@shared/CheckboxComponent'
import { DecimalInput } from '@shared/DecimalInput'
import { PriceUnitTypes, QuantityTypes, ShopItem } from '@types'
import { FormContainer, SelectorWrapper } from '../SharedElements'
import { ChangeEvent, useState } from 'react'

type ShopItemDetailsProps = {
  shopItem: ShopItem | null
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
  const [item, setItem] = useState(shopItem)
  const { backNav } = useNavigation()

  if (!item) return <></>
  return (
    <>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault()
          onSave(item)
          backNav()
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
          onChange={(value: string) => setItem({ ...item, store: value })}
          placeholder='Store'
          name='shop-item-store'
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
              onChange={(value: string) =>
                setItem({ ...item, quantity_type: value })
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
              onChange={(newValue: number) =>
                setItem({ ...item, price: newValue })
              }
            />
            <SelectorComponent
              name='price'
              allValues={PriceUnitTypes}
              selectedValue={item.price_unit}
              onChange={(value: string) =>
                setItem({ ...item, price_unit: value })
              }
            />
          </SelectorWrapper>
        </label>
        <CheckboxComponent
          label='Offer? 🔖'
          name='offer-checkbox'
          isChecked={item.offer}
          onChange={() => setItem({ ...item, offer: !item.offer })}
        />
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            onDelete(item)
            backNav()
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
