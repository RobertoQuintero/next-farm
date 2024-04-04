import { Metadata } from 'next'
import ProductsPage from './components/ProductsPage'

export const metadata: Metadata = {
  title: 'Hibye | Productos',
  description: 'Hibye Granjas',
}

const Products = () => <ProductsPage/>

export default Products