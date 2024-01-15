import {ReactNode} from 'react'
import CustomMenuLink from '../components/CustomMenuLink'
import { FarmsProvider } from '../context/farms/FarmsProvider'

const links=[
  {href:'/farms',title:'Granjas'},
]
const RootLayout = ({children}:{children:ReactNode}) => {
  return (
      <FarmsProvider>
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
      </FarmsProvider>
  )
}

export default RootLayout