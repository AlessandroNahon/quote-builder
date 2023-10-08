import { type ReactElement, useState, useContext } from 'react'

import { ProductType } from '../types'
import { PopUpImage, Product } from '.'
import Search from './Search'
import AppContext from '../context/appContext'

interface Props {
  products: ProductType[]
}

function startsWithNumber(str: string) {
  return /^\d+(?=\s|$)/.test(str)
}

export default function Products({ products }: Props): ReactElement {
  const [searchValue, setSearchValue] = useState('')
  const [productInModal, setProductInModal] = useState<ProductType | null>(null)

  const { handleSelectProduct } = useContext(AppContext)
  if (products.length === 0) return <p>Nothing to see here</p>

  function searchProduct(products: ProductType[]) {
    if (startsWithNumber(searchValue)) return products.filter((p) => p.sku.includes(searchValue))

    return products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
  }

  return (
    <section id='browser' className='products'>
      <span className='browser-header'>
        <h2>Products</h2>
        <Search placeholder='Search products' setSearchValue={setSearchValue} />
      </span>

      <ul>
        {searchProduct(products)?.map((product: ProductType, index: number) => (
          <li
            role='button'
            tabIndex={0}
            key={product.sku}
            onClick={() => handleSelectProduct!(product)}
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
