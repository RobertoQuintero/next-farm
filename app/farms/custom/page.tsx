import { Metadata } from 'next'
import React from 'react'
import FarmPage from './components/FarmPage'

export const metadata: Metadata = {
  title: 'Hibye | Bitácora',
  description: 'Hibye Granjas',
}

const Farm = () =><FarmPage/>

export default Farm