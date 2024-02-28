import React from 'react'
import HistoryPigletsPage from './components/HistoryPigletsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Historial Lechones',
  description: 'Hibye Granjas',
}

const HistoryPiglets = () => <HistoryPigletsPage/>

export default HistoryPiglets