import { Metadata } from 'next'
import React from 'react'
import StallionsPage from './components/StallionsPage'

export const metadata: Metadata = {
  title: 'Hibye | Sementales',
  description: 'Hibye Granjas',
}

const Stallions = () => <StallionsPage/>

export default Stallions