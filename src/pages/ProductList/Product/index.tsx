import React, { FC } from 'react'

import Button from '../../../components/Button'
import { kebabCase } from '../../../utils/kebab-case'
import * as routes from '../../../routes'
import { ProductType } from '../../../common/types'

import { Wrapper, ImgWrap, Img, TitleWrap, Title, Price, Link } from './styled'

interface Props {
  node: ProductType
  onAddToCart: (id: string) => void
}

const Product: FC<Props> = ({ node, onAddToCart }) => (
  <Wrapper data-testid="product-in-list">
    <Link
      href={`/product?id=${node.id}`}
      as={`${routes.PRODUCT_LIST}/${node.id}/${kebabCase(node.name)}`}
    >
      <ImgWrap>
        <Img src={node.image_url} alt={`${node.name} image`} />
      </ImgWrap>
      <TitleWrap>
        <Title>{node.name}</Title>
      </TitleWrap>
      <Price>{node.price.formatted_amount}</Price>
      <Button
        onClick={event => {
          event.preventDefault()
          onAddToCart(node.id)
        }}
      >
        Add to Cart
      </Button>
    </Link>
  </Wrapper>
)

export { Product }
