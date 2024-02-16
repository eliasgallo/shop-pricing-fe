import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'
import ShopCartImage from '@images/shopcart.png'
import BoutiqueImage from '@images/boutique.png'
import { Link } from 'react-router-dom'
import { ThemePicker } from '../components/ThemePicker'
import { LanguagePicker } from '../components/LanguagePicker'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
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
  const { t } = useTranslation()
  return (
    <>
      <ButtonContainer>
        {ImageTextButton(BoutiqueImage, t('home.price'), '/price-control')}
        {ImageTextButton(ShopCartImage, t('home.shop'), '/shop-list')}
        <ThemePicker labelText={t('home.theme')} />
        <LanguagePicker labelText={t('home.language')} />
      </ButtonContainer>
    </>
  )
}
