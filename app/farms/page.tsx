import { Metadata } from 'next'
import React from 'react'
import FarmsPage from './components/FarmsPage'

export const metadata: Metadata = {
  title: 'Hibye | Granjas',
  description: 'Hibye Granjas',
}

const Farms = () => <FarmsPage/>

export default Farms