import { Metadata } from 'next'
import React from 'react'
import StaticsPage from './components/StaticsPage'

export const metadata: Metadata = {
  title: 'Hibye | Estadísticas',
  description: 'Hibye Granjas',
}

const Statics = () => <StaticsPage/>

export default Statics