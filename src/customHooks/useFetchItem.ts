import { useMemo } from 'react'
import { findWithId } from '@utils/listUtils'
import { getItemIdFromParams, getSectionSearchParam } from './routerDomHooks'

export const useItemFromParams = <
  ItemType extends { id?: number },
  SectionKey extends keyof ItemType
>(
  list: ItemType[],
  initItem: ItemType,
  section: SectionKey
): ItemType | null => {
  const itemId: 'new' | number = getItemIdFromParams()
  const sectionName = getSectionSearchParam()
  return useMemo(() => {
    if (itemId === 'new') {
      return { ...initItem, [section]: sectionName || initItem[section] }
    }
    const foundItem = findWithId<ItemType>(list, itemId)
    return foundItem || null
  }, [itemId, sectionName])
}
