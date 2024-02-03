import React from 'react'
import LossReasonsPage from './components/LossReasonsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Motivo baja',
  description: 'Hibye Granjas',
}
const LossReasons = () => <LossReasonsPage/>

export default LossReasons