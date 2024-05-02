import {ReactNode} from 'react'
import CustomMenuLink from '../../components/CustomMenuLink'

const links=[
  {href:'/farms/custom',title:'Bitácora cerdas'},
  {href:'/farms/custom/piglets',title:'Bitácora lechones'},
  {href:'/farms/custom/growing_pigs',title:'Bitácora Crecimiento'},
  {href:'/farms/custom/task_log',title:'Bitácora Actividades'},
  {href:'/farms/custom/support',title:'Soporte Médico'},
  {href:'/farms/custom/statics',title:'Estadísticas'},
  {href:'/farms/custom/reports',title:'Reportes'},
  {href:'/farms/custom/stallions_report',title:'Reporte Sementales'},
  {href:'/farms/custom/products',title:'Productos'},
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