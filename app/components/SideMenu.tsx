import { Box, Divider, Drawer } from '@mui/material'
import React, { useContext } from 'react'
import { UiContext } from '../context/ui/UiContext'
import { MenuLink } from './MenuLink'
import { menuLinksArray } from './helpers';
import { BookmarkAddOutlined, EventAvailableOutlined, HomeOutlined, LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import { AuthContext } from '../context/auth/AuthContext';
import { useRouter } from 'next/navigation';

const SideMenu = () => {
  const {isMenuOpen,toggleSideMenu,toggleModal,uiReset}= useContext(UiContext)
  const {logged,logout,setShowForm} = useContext(AuthContext)
  const router = useRouter()
  
  const navigateTo=(href:string)=>{
    router.push(href)
    toggleSideMenu()
  }

  const onLogout=()=>{
    router.replace('/')
    toggleSideMenu()
    logout()
  }
  const onLogin=()=>{
    toggleSideMenu()
    toggleModal()
    setShowForm(false)
  }
  const onSignup=()=>{
    toggleSideMenu()
    setShowForm(true)
    toggleModal()
  }


  return (
    <Drawer
      open={ isMenuOpen }
      anchor='right'
      sx={{ 
        backdropFilter: 'blur(4px)',
        transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu} >
      <Box sx={{ width: 250, paddingTop: '2rem'}}>
      <MenuLink  icon={<HomeOutlined/>} label='Inicio' onClick={()=>navigateTo('/')}  />
      <MenuLink  icon={<EventAvailableOutlined/>} label='Entradas' onClick={()=>navigateTo('/assist')}  />
        {
          logged
          ?menuLinksArray.map(link=>(
            <MenuLink 
              key={link.label}
              icon={link.icon}
              label={link.label}
              onClick={()=>navigateTo(link.href)}
              />
          ))
          :<></>
        }
        <Divider sx={{margin:'0 .5rem'}}/>
        {
          logged
            ?<MenuLink  icon={<LogoutOutlined/>} label='Logout' onClick={onLogout} />
            :(
              <>
                <MenuLink icon={<LoginOutlined/>} label='Login' onClick={onLogin} />
                <MenuLink icon={<BookmarkAddOutlined/>} label='Signup'  onClick={onSignup} />
              </>
            )
        }
      </Box>
    </Drawer>
  )
}

export default SideMenu