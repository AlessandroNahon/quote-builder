import React, { type ReactElement, useState, useContext, useRef } from 'react'

import { ProductType } from '../types'
import { PopUpImage, Product } from '.'
import Search from './Search'
import AppContext, { AppContextInterface } from '../context/appContext'

interface Props {
  products: ProductType[]
}

function startsWithNumber(str: string) {
  return /^\d+(?=\s|$)/.test(str)
}

export default function Products({ products }: Props): ReactElement {
  const formRef = useRef(null)
  const [productInModal, setProductInModal] = useState<ProductType | null>(null)
  const { handleSelectProduct, searchValue, setSearchValue } =
    useContext<AppContextInterface>(AppContext)

  if (products.length === 0) return <p>Nothing to see here</p>

  function filterProductsBySearchValue(products: ProductType[]): ProductType[] {
    if (startsWithNumber(searchValue)) return products.filter((p) => p.sku.includes(searchValue))
    return products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
  }

  function selectProduct(product: ProductType): void {
    handleSelectProduct(product)
    setSearchValue('')

    const form: HTMLFormElement = formRef.current as unknown as HTMLFormElement

    if (form) form.reset()
  }

  return (
    <section id="browser" className="products">
      <span className="browser-header">
        <h2>Products</h2>
        <form ref={formRef}>
          <Search placeholder="Search products" setSearchValue={setSearchValue} />
        </form>
      </span>

      <ul>
        {filterProductsBySearchValue(products)?.map((product: ProductType) => (
          <li
            role="button"
            tabIndex={0}
            key={product.sku}
            onClick={() => selectProduct(product)}
            onKeyUp={(e) => e.code === 'Enter' && selectProduct(product)}
          >
            <Product
              product={product}
              setProductInModal={setProductInModal}
              productInModal={productInModal!}
            />
          </li>
        ))}
      </ul>
      {productInModal && productInModal?.url && (
        <PopUpImage product={productInModal} setProductInModal={setProductInModal} />
      )}
    </section>
  )
}
