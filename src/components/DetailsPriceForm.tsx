import { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import { PriceControlItem } from '../types'
import { SelectorComponent } from './shared/SelectorComponent'
import {
  CategoryType,
  PriceUnitTypes,
  ReliabilityType,
  TagType,
} from '../store'
import { concatDistinct } from '../utils/listUtils'

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

export type DetailsPriceFormProps = {
  item: PriceControlItem
  isNewItem: boolean
  onSave: (item: PriceControlItem) => void
  onCancel: () => void
  onDelete: () => void
}

const toggleTag = (tags: string[], tagKey: string) => {
  return tags.includes(tagKey)
    ? tags.filter((tag) => tag !== tagKey)
    : concatDistinct(tags, [tagKey])
}

export const DetailsPriceForm: React.FC<DetailsPriceFormProps> = (props) => {
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
            name='price_item_name'
            placeholder='Name'
            value={item.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setItem({ ...item, name: e.target.value })
            }
          />
        </FormSection>
        <FormSection>
          <InputSelectWrapper>
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
          </InputSelectWrapper>
        </FormSection>
        <FormSection>
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
        </FormSection>
        <FormSection>
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
        </FormSection>
        <FormSection>
          {Object.keys(TagType).map((tagKey) => {
            return (
              <label key={tagKey}>
                {TagType[tagKey]}
                <input
                  type='checkbox'
                  name={tagKey}
                  checked={item.tags.includes(tagKey)}
                  onChange={() =>
                    setItem({
                      ...item,
                      tags: toggleTag(item.tags, tagKey),
                    })
                  }
                />
              </label>
            )
          })}
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
