import { 
  AccountBoxOutlined,
  FormatListNumberedOutlined,
  GroupAddOutlined, 
  PlaylistAddCheckOutlined, 
  RequestQuoteOutlined,
  TaskAltOutlined} from '@mui/icons-material';

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
    icon: <FormatListNumberedOutlined />
  },
]
export const ownerMenuLinksArray:MenuLinkElement[]=[
  {
    label:'Lista Granjas',
    href:'/farms',
    icon: <TaskAltOutlined />
  },
  ...menuLinksArray
]

