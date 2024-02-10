import { Metadata } from 'next'
import React from 'react'
import RacesPage from './components/RacesPage'

export const metadata: Metadata = {
  title: 'Hibye | Razas',
  description: 'Hibye Granjas',
}

const Races = () => <RacesPage/>

export default Races