import { Metadata } from 'next'
import React from 'react'
import StagesPage from './components/StagesPage'

export const metadata: Metadata = {
  title: 'Hibye | Etapas',
  description: 'Hibye Granjas',
}

const Stages = () => <StagesPage/>

export default Stages