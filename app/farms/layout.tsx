import {ReactNode} from 'react'
import { FarmsProvider } from '../context/farms/FarmsProvider'


const RootLayout = ({children}:{children:ReactNode}) => {
  return (
      <FarmsProvider>
        <div >
          {children}
        </div>
      </FarmsProvider>
  )
}

export default RootLayout