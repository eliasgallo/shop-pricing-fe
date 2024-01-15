import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
          placeholder={t('detail.common.name-input')}
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
            onChange={(newValue: number) =>
              setItem({ ...item, comparison_price: newValue })
            }
          />
          <SelectorComponent
            name='comparison_price_unit'
            allValues={PriceUnitTypes}
            selectedValue={item.comparison_price_unit}
            onChange={(value: string) =>
              setItem({ ...item, comparison_price_unit: value })
            }
          />
        </SelectorWrapper>
        <SelectorWrapper>
          Reliability
          <SelectorComponent
            name='reliability'
            allValues={ReliabilityType}
            selectedValue={item.reliability}
            onChange={(value: string) =>
              setItem({ ...item, reliability: value })
            }
          />
        </SelectorWrapper>
        <SelectorWrapper>
          {t('detail.price.category')}
          <SelectorComponent
            name='category'
            allValues={CategoryType}
            selectedValue={item.category}
            onChange={(value: string) => setItem({ ...item, category: value })}
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
        <button type='submit'>{t('detail.save-button')}</button>
        <button
          type='button'
          onClick={() => {
            deleteItem(item)
            backNav()
          }}
        >
          {t('detail.price.delete')}
        </button>
      </FormContainer>
      {loading && <Spinner />}
    </>
  )
}
