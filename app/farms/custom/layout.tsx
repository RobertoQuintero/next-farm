import {ReactNode} from 'react'
import CustomMenuLink from '../../components/CustomMenuLink'

const links=[
  {href:'/farms',title:'Bitácora cerdas'},
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