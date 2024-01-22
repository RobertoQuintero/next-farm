import React from 'react'
import UsersPage from './components/UsersPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Usuarios',
  description: 'Hibye Granjas',
}

const HibyeUsers = () => <UsersPage/>

export default HibyeUsers