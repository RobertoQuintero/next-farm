import { UsersProvider } from "@/app/context/users/UsersProvider"
import { ReactNode } from "react"

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
       <UsersProvider>
      <>
          {children}
      </>
      </UsersProvider>
    </div>
      
  )
}

export default RootLayout