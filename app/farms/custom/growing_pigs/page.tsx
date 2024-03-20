import { Metadata } from 'next'
import React from 'react'
import GrowingPigsPage from './components/GrowingPigsPage'

export const metadata: Metadata = {
  title: 'Hibye | Bitácora Crecimiento',
  description: 'Hibye Granjas',
}

const GrowingPigs = () => <GrowingPigsPage/>

export default GrowingPigs