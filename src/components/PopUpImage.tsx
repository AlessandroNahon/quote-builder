import { createPortal } from 'react-dom'
import { ProductType } from '../types'
import CloseSvg from '../close-svg.svg'

interface PopUpProp {
  product: ProductType
  setProductInModal: (product: ProductType | null) => void
}

export default function PopUpImage({ product, setProductInModal }: PopUpProp) {
  const container = document.getElementById('quote-builder')

  return createPortal(
    <div id='portal-bg' onClick={() => setProductInModal!(null)}>
      <div id='portal'>
        <img
          className='close'
          src={CloseSvg}
          alt='close modal'
          onClick={() => setProductInModal!(null)}
        />
        <img className='pop-up-img' src={product?.url} alt={product.name} />
      </div>
    </div>,
    container as Element
  )
}
