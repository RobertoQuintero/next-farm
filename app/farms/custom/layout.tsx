import {ReactNode} from 'react'
import CustomMenuLink from '../../components/CustomMenuLink'

const links=[
  {href:'/farms/custom',title:'Bitácora cerdas'},
  {href:'/farms/custom/users',title:'Usuarios'},
  {href:'/farms/custom/roles',title:'Roles'},
  {href:'/farms/custom/ubications',title:'Ubicaciones'},
  {href:'/farms/custom/tasks',title:'Tareas'},
  {href:'/farms/custom/stages',title:'Etapas'},
  {href:'/farms/custom/loss_reasons',title:'Motivo baja'},
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