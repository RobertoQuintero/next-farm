import { Metadata } from 'next'
import React from 'react'
import PigletsPage from './components/PigletsPage'

export const metadata: Metadata = {
  title: 'Hibye | Lechones',
  description: 'Hibye Granjas',
}

const Piglets = () => <PigletsPage/>

export default Piglets