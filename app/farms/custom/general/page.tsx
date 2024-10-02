import { Metadata } from 'next'
import React from 'react'
import GeneralPage from './components/GeneralPage'

export const metadata: Metadata = {
  title: 'Hibye | Reporte General',
  description: 'Hibye Granjas',
}

const General = () => <GeneralPage/>

export default General
