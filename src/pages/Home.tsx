import { styled } from 'styled-components'
import ShopCartImage from '@images/shopcart.png'
import BoutiqueImage from '@images/boutique.png'
import { Link } from 'react-router-dom'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Button = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: double;
  border-color: lightgray;
  background-color: transparent;
  gap: 10px;
  text-decoration: none;
  color: #007aff;
  font-weight: bold;
  padding: 5px;
  max-width: 150px;
  text-align: center;
  box-shadow: 10px 10px 5px 1px #0000ff33;
`

const Image = styled.img`
  height: 120px;
`

const ImageTextButton = (img: string, text: string, linkTo: string) => (
  <Button to={linkTo}>
    <Image src={img} />
    <span>{text}</span>
  </Button>
)

export const Home = () => {
  return (
    <HomeContainer>
      {ImageTextButton(BoutiqueImage, 'Price Control', '/price-control')}
      {ImageTextButton(ShopCartImage, 'Shopping List', '/shop-list')}
    </HomeContainer>
  )
}
