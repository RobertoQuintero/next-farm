'use client'
import { useContext} from "react"
import { AppBar, Toolbar, Box, Button, ButtonGroup, CircularProgress} from "@mui/material"
import Link from "next/link"
import { MenuOutlined} from '@mui/icons-material'
import { UiContext } from "../context/ui/UiContext"
import AppModal from "./AppModal"
import { LoginForm } from './LoginForm';
import { RegisterForm } from "./RegisterForm"
import SideMenu from "./SideMenu"
import styles from './components.module.css'
import { AuthContext } from "../context/auth/AuthContext"
import { useRouter } from "next/navigation"

const style={
  padding:'0 .5rem'
}

export const Navbar = () => {
  const router = useRouter()
  const {toggleModal,toggleSideMenu} = useContext(UiContext)
  const {logged,logout,authLoading,showForm,setShowForm,company,companyUser,user} = useContext(AuthContext)
  
  const onLogout=()=>{ 
    logout()
    router.replace('/')
   }

  const openModal=(show:boolean)=>{
    setShowForm(show)
    toggleModal()
  }
  
  return (
    <nav>
      <AppBar sx={{zIndex:1000}} >
        <Toolbar sx={{ maxWidth:'1200px', width:'100%',margin:'0 auto'}} >
            <Link href='/' className="flexCenter" >
              <h3>Granjas</h3>
            </Link>
          <Box flex={1}/>
          <Box sx={{display:{xs:'none',sm:'block'}}}
            className='fadeIn'>
            <Link className={styles.menuLink} style={style} href='/'>    
                Inicio
            </Link>
            {
              user
                ?<>
                  <Link
                    className={styles.menuLink}
                    style={style}
                    href='/farms'>
                  Granjas
                </Link>
                  <Link
                    className={styles.menuLink}
                    style={style}
                    href='/users'>
                  Usuarios
                </Link>
                
                </>
            :<></>
            }
          </Box>
          <Box flex={1}/>
          {
            authLoading
              ? <CircularProgress size='1rem'/>
              : <>
              {
                user 
                ? <span className={styles.userName}>
                    {user?.name?.split(' ')[0]}
                  </span>
                :<></>
              }
                <div className={styles.buttonGroup}>
                  {
                    logged
                      ?<Button 
                        onClick={onLogout}
                        variant="outlined" 
                        size="small">Salir</Button>
                      :(<ButtonGroup 
                        size='small' 
                        aria-label="small outlined primary button group">
                          <Button onClick={()=>openModal(false)}>login</Button>
                          <Button onClick={()=>openModal(true)}>signup</Button>
                      </ButtonGroup>)
                  }
                </div>
              </>
          }
          <Button
            sx={{display:{xs:'flex',sm:'none'}}}
            onClick={toggleSideMenu}>
            <MenuOutlined/>
          </Button>
        </Toolbar>
        {
          !logged&&
            (<AppModal>
              {
                !showForm
                  ?<LoginForm/>
                  :<RegisterForm/>
              }       
            </AppModal>)
        }
        <SideMenu/>
      </AppBar>
    </nav>
  )
}
