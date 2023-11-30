import { useEffect } from 'react'
import { Spinner } from '../Spinner'
import { LocationStateNewItem, PriceItem } from '../../types'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { PriceListRow } from './PriceListRow'
import { PriceListType } from '../../store/reducers/priceReducer'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ListWrapper = styled.div`
  margin-top: 5px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const NewItem = styled.div`
  align-self: flex-end;
  background-color: #24a0ed;
  color: white;
  padding: 5px 5px;
  border: 2px solid black;
  border-radius: 5px;
`

const SectionButton = styled.div`
  cursor: pointer;
  color: #24a0ed;
  min-width: 30%; // increase click size in case the name is short
`
const Section = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`

type PriceListProps = {
  priceList: PriceListType
  loading: boolean
  error: string | null
  fetchList: () => void
}

export const PriceListContainer: React.FC<PriceListProps> = ({
  priceList,
  loading,
  error,
  fetchList,
}: PriceListProps) => {
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (Object.keys(priceList).length === 0) fetchList()
  }, [])

  return (
    <>
      <HeaderContainer>
        <h1>Price list</h1>
        <NewItem
          onClick={() => {
            navigate(`./new`, { relative: 'path' })
          }}
        >
          New Item ＋
        </NewItem>
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <List>
        {Object.keys(priceList).map((category: string) => {
          return (
            <Section key={category}>
              <SectionButton
                onClick={() => {
                  const catState: LocationStateNewItem = { data: category }
                  navigate(`./new`, { relative: 'path', state: catState })
                }}
              >
                {category} (+)
              </SectionButton>
              {priceList[category].map((item: PriceItem) => {
                return (
                  <li key={item.id}>
                    <ListWrapper>
                      <PriceListRow
                        key={item.id}
                        item={{ ...item }}
                        onRowClick={() =>
                          navigate(`./${item.id}`, { relative: 'path' })
                        }
                      />
                    </ListWrapper>
                  </li>
                )
              })}
            </Section>
          )
        })}
      </List>
      {loading && <Spinner />}
    </>
  )
}
