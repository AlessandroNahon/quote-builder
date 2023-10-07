import { useContext, type ReactElement } from 'react'

import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'
import { toTitleCase } from '../utils'

import ZoomInSvg from '../zoom.svg'

interface Props {
  product: ProductType
  setProductInModal?: (product: ProductType) => void
  productInModal?: ProductType
}

export default function Product({ product, productInModal, setProductInModal }: Props): ReactElement {

  const { quote } = useContext(AppContext)
  const ok = quote.lineItems.some((li: LineItemDataInterface) => li.id === product.id)

  return (
    <div className={ok ? 'product selected' : 'product'} key={product.sku}>
      <div>{toTitleCase(product.name)}</div>
      {product?.url &&
        <div className='image-wrapper'>
          <img className='zoom-in' src={ZoomInSvg} alt='' onClick={(e) => {
            e.stopPropagation()
            setProductInModal!(product)
          }} />
          <img className='product-image' src={product?.url} alt={product.name} />
        </div>}
      <div><span>SKU: {product.sku}</span></div>
    </div>
  )
}
