import { Metadata } from 'next'
import React from 'react'
import CatalogsPage from './components/CatalogsPage'

export const metadata: Metadata = {
  title: 'Hibye | Catálogos',
  description: 'Hibye Granjas',
}

const Catalogs = () => <CatalogsPage/>

export default Catalogs