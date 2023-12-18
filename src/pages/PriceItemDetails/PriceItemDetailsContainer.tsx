import { ChangeEvent, useState } from 'react'
import { useNavigation } from '@customHooks/routerDomHooks'
import { SelectorComponent } from '@shared/SelectorComponent'
import { Spinner } from '@shared/Spinner'
import { DecimalInput } from '@shared/DecimalInput'
import { CheckboxComponent } from '@shared/CheckboxComponent'
import {
  CategoryType,
  PriceItem,
  PriceUnitTypes,
  ReliabilityType,
  TagType,
} from '@types'
import { distinct } from '@utils/listUtils'
import { FormContainer, SelectorWrapper } from '../SharedElements'

const toggleTag = (tags: string[], tagKey: string) => {
  return tags.includes(tagKey)
    ? tags.filter((tag) => tag !== tagKey)
    : distinct(tags.concat(tagKey))
}

type PriceDetailsProps = {
  priceItem: PriceItem | null
  loading: boolean
  error: string | null
  saveItem: (item: PriceItem) => void
  deleteItem: (item: PriceItem) => void
}

export const PriceDetailsContainer = ({
  priceItem,
  loading,
  error,
  saveItem,
  deleteItem,
}: PriceDetailsProps): JSX.Element => {
  const [item, setItem] = useState(priceItem)
  const { backNav } = useNavigation()

  if (!item) return <></>
  return (
    <>
      {error && `Error message: ${error}`}
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault()
          saveItem(item)
          backNav()
        }}
      >
        <input
          type='text'
          name='price_item_name'
          placeholder='name'
          value={item.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, name: e.target.value })
          }
        />
        <SelectorWrapper>
          <DecimalInput
            decimals={2}
            name='price'
            startValue={item.comparison_price}
            valueChanged={(newValue: number) =>
              setItem({ ...item, comparison_price: newValue })
            }
          />
          <SelectorComponent
            name='comparison_price_unit'
            allValues={PriceUnitTypes}
            selectedValue={item.comparison_price_unit}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setItem({
                ...item,
                comparison_price_unit: e.target.value,
              })
            }
          />
        </SelectorWrapper>
        <SelectorWrapper>
          Reliability
          <SelectorComponent
            name='reliability'
            allValues={ReliabilityType}
            selectedValue={item.reliability}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setItem({
                ...item,
                reliability: e.target.value,
              })
            }
          />
        </SelectorWrapper>
        <SelectorWrapper>
          Category
          <SelectorComponent
            name='category'
            allValues={CategoryType}
            selectedValue={item.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setItem({
                ...item,
                category: e.target.value,
              })
            }
          />
        </SelectorWrapper>
        {Object.keys(TagType).map((tagKey) => {
          return (
            <CheckboxComponent
              key={tagKey}
              name={tagKey}
              label={TagType[tagKey]}
              isChecked={item.tags.includes(tagKey)}
              onChange={() =>
                setItem({
                  ...item,
                  tags: toggleTag(item.tags, tagKey),
                })
              }
            />
          )
        })}
        <button type='submit'>Save</button>
        <button
          type='button'
          onClick={() => {
            deleteItem(item)
            backNav()
          }}
        >
          Delete
        </button>
      </FormContainer>
      {loading && <Spinner />}
    </>
  )
}
