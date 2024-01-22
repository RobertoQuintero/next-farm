import {ReactNode} from 'react'
import { FarmsProvider } from '../context/farms/FarmsProvider'


const RootLayout = ({children}:{children:ReactNode}) => {
  return (
      <FarmsProvider>
          < >
            {children}
          </>
      </FarmsProvider>
  )
}

export default RootLayout