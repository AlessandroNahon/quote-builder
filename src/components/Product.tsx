import React, { useContext, type ReactElement, useState, useEffect } from 'react'

import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'
import { toTitleCase } from '../utils'

import ZoomInSvg from '../zoom.svg'
import PictureSvg from '../picture.svg'

interface Props {
  product: ProductType
  setProductInModal?: (product: ProductType) => void
}

export default function Product({ product, setProductInModal }: Props): ReactElement {
  const { quote } = useContext(AppContext)
  const selected = quote?.lineItems.some((li: LineItemDataInterface) => li.id === product.id)
  const imgUrl = useProgressiveImage(product.url ?? null)

  return (
    <div className={selected ? 'product selected' : 'product'} key={product.sku}>
      <div className="image-wrapper">
        {product?.url && (
          <img
            className="zoom-in"
            src={ZoomInSvg}
            alt=""
            onClick={(e) => {
              e.stopPropagation()
              setProductInModal && setProductInModal(product)
            }}
            loading="eager"
          />
        )}
        <div
          className={product?.url ? 'product-image' : 'product-image no-image'}
          style={{
            backgroundImage: `url('${product?.url ? imgUrl : PictureSvg}')`
          }}
        />
      </div>
      <div>{toTitleCase(product.name)}</div>
      <div>
        <span>SKU: {product.sku}</span>
      </div>
      <div className={selected ? 'animated-checkmark selected' : 'animated-checkmark'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeLinecap='square'
          strokeLinejoin='miter'
        >
          <path d="M6.75 12.5l3.25 3.25L16.5 9" />
        </svg>
      </div>
    </div>
  )
}

function useProgressiveImage(src: string | null) {
  const [sourceLoaded, setSourceLoaded] = useState<string | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = src ?? ''
    img.onload = () => setSourceLoaded(src)
  }, [src])

  return sourceLoaded
}
