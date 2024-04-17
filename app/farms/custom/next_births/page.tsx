import { Metadata } from 'next'
import React from 'react'
import NextBirthsPage from './components/NextBirthsPage'

export const metadata: Metadata = {
  title: 'Hibye | Próximos partos',
  description: 'Hibye Granjas',
}

const NextBirths = () => <NextBirthsPage/>

export default NextBirths