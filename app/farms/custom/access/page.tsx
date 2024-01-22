import React from 'react'
import AccessPage from './components/AccessPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Accesos',
  description: 'Hibye Granjas',
}

const Access = () => <AccessPage/>

export default Access