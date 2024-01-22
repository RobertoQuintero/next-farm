import React from 'react'
import RolesPage from './components/RolesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hibye | Roles',
  description: 'Hibye Granjas',
}

const UserRoles = () => <RolesPage/>

export default UserRoles