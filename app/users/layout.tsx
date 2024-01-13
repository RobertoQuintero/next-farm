import {ReactNode} from 'react'

import { UsersProvider } from '../context/users/UsersProvider'
import CustomMenuLink from '../components/CustomMenuLink'


const links=[
  {href:'/users',title:'Usuarios'},
]
const RootLayout = ({children}:{children:ReactNode}) => {
  return (
      <div className='mainContainer'>
        <UsersProvider>
          <aside className='mainMenuLeft'>
            {
              links.map(link=>(
                <CustomMenuLink key={link.href} {...link}/>
              ))
            }
          </aside>
          <div className='mainPage'>
            {children}
          </div>
        </UsersProvider>
      </div>
  )
}

export default RootLayout