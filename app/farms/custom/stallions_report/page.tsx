import React from 'react'
import StallionsMonthsPage from './components/StallionsMonthsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Reporte Sementales',
  description: 'Hibye Granjas',
}

const StallionMonths = () => <StallionsMonthsPage/>

export default StallionMonths