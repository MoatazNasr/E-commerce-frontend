import React from 'react'
import ColorSizePriceFilters from '../components/ColorSizePriceFilters';
import CategoryFilters from '../components/CategoryFilters';
const Filters = ({productsCategoriesQuantity}) => {
  return (
    <div>
      <ColorSizePriceFilters/>
      <CategoryFilters productsCategoriesQuantity={productsCategoriesQuantity}/>
    </div>
  )
}

export default Filters