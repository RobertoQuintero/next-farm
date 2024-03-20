import {ReactNode} from 'react'
import CustomMenuLink from '../../components/CustomMenuLink'

const links=[
  {href:'/farms/custom',title:'Bitácora cerdas'},
  {href:'/farms/custom/piglets',title:'Bitácora lechones'},
  {href:'/farms/custom/growing_pigs',title:'Bitácora Crecimiento'},
  {href:'/farms/custom/users',title:'Usuarios'},
  {href:'/farms/custom/roles',title:'Roles'},
  {href:'/farms/custom/catalogs',title:'Catálogos'},
]
const RootLayout = ({children}:{children:ReactNode}) => {
  return (
        <div className='mainContainer'>
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
        </div>

  )
}

export default RootLayout