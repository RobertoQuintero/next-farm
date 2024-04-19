import { Metadata } from 'next'
import React from 'react'
import GrowingPigsPage from './components/GrowingPigsPage'

export const metadata: Metadata = {
  title: 'Hibye | Crecimiento',
  description: 'Hibye Granjas',
}
const HistoryGrowingPigs = () => <GrowingPigsPage/>

export default HistoryGrowingPigs