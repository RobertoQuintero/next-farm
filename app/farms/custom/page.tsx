import { Metadata } from 'next'
import React from 'react'
import FarmPage from './components/FarmPage'

export const metadata: Metadata = {
  title: 'Hibye | Granja',
  description: 'Hibye Granjas',
}

const Farm = () =><FarmPage/>

export default Farm