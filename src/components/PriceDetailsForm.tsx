import { ChangeEvent, useState } from 'react'
import { SelectorComponent } from './shared/SelectorComponent'
import {
  CategoryType,
  PriceItem,
  PriceUnitTypes,
  ReliabilityType,
  TagType,
} from '../types'
import { concatDistinct } from '../utils/listUtils'
import { CheckboxComponent } from './shared/CheckboxComponent'
import { FormContainer, SelectorWrapper } from './shared/SharedElements'

export type PriceDetailsFormProps = {
  item: PriceItem
  isNewItem: boolean
  onSave: (item: PriceItem) => void
  onDelete: () => void
}

const toggleTag = (tags: string[], tagKey: string) => {
  return tags.includes(tagKey)
    ? tags.filter((tag) => tag !== tagKey)
    : concatDistinct(tags, [tagKey])
}

export const PriceDetailsForm: React.FC<PriceDetailsFormProps> = (props) => {
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
          name='price_item_name'
          placeholder='name'
          value={item.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setItem({ ...item, name: e.target.value })
          }
        />
        <SelectorWrapper>
          <input
            type='number'
            name='price'
            placeholder='price'
            min={0}
            value={item.comparison_price || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setItem({
                ...item,
                comparison_price: parseInt(e.target.value) || 0,
              })
            }
          />
          <SelectorComponent
            name='comparison_price_unit'
            allValues={PriceUnitTypes}
            selectedValue={item.comparison_price_unit}
            onChange={(value) =>
              setItem({
                ...item,
                comparison_price_unit: value,
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
            onChange={(value) =>
              setItem({
                ...item,
                reliability: value,
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
            onChange={(value) =>
              setItem({
                ...item,
                category: value,
              })
            }
          />
        </SelectorWrapper>
        {Object.keys(TagType).map((tagKey) => {
          return (
            <CheckboxComponent
              key={tagKey}
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
          onClick={props.onDelete}
        >
          Delete
        </button>
      </FormContainer>
    </>
  )
}
