import { Metadata } from 'next'
import React from 'react'
import HistoryPage from './components/HistoryPage'

export const metadata: Metadata = {
  title: 'Hibye | Historial',
  description: 'Hibye Granjas',
}

const History = () => <HistoryPage/>

export default History