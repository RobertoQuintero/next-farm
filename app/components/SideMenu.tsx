import { Box, Divider, Drawer } from '@mui/material'
import React, { useContext } from 'react'
import { UiContext } from '../context/ui/UiContext'
import { MenuLink } from './MenuLink'
import { menuLinksArray, ownerMenuLinksArray } from './helpers';
import { BookmarkAddOutlined,  HomeOutlined, LoginOutlined, LogoutOutlined } from '@mui/icons-material';
import { AuthContext } from '../context/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { AccordionElement } from '.';

const SideMenu = () => {
  const {isMenuOpen,toggleSideMenu,toggleModal,uiReset}= useContext(UiContext)
  const {logged,logout,setShowForm,user} = useContext(AuthContext)
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
        

        {
          logged
            ?<>
              <AccordionElement title='Granjas' open>
                {
                  logged
                  ?(user?.id_role===1?ownerMenuLinksArray:menuLinksArray).map(link=>(
                    <MenuLink 
                      key={link.label}
                      icon={link.icon}
                      label={link.label}
                      onClick={()=>navigateTo(link.href)}
                      />
                  ))
                  :<></>
                }
              </AccordionElement>
              <Divider sx={{margin:'0 .5rem'}}/>
              <MenuLink  icon={<LogoutOutlined/>} label='Logout' onClick={onLogout} />
            </>
            :(
              <>
                <Divider sx={{margin:'0 .5rem'}}/>
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