import { 
  AccountBoxOutlined,
  GroupAddOutlined, 
  PlaylistAddCheckOutlined, 
  RequestQuoteOutlined} from '@mui/icons-material';

interface MenuLinkElement {
  label:string;
  href:string;
  icon: JSX.Element
}

export const menuLinksArray:MenuLinkElement[]=[
  {
    label:'Bitácora cerdas',
    href:'/farms/custom',
    icon: <PlaylistAddCheckOutlined />
  },
  {
    label:'Usuarios',
    href:'/farms/custom/users',
    icon: <AccountBoxOutlined />
  },
  {
    label:'Roles',
    href:'/farms/custom/roles',
    icon: <GroupAddOutlined />
  },
  {
    label:'Catálogos',
    href:'/farms/custom/catalogs',
    icon: <RequestQuoteOutlined />
  },
  
]

const links=[
  {href:'/farms/custom',title:'Bitácora cerdas'},
  {href:'/farms/custom/users',title:'Usuarios'},
  {href:'/farms/custom/roles',title:'Roles'},
  {href:'/farms/custom/catalogs',title:'Catálogos'},
]