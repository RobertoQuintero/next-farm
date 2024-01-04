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
    label:'Reservaciones',
    href:'/booking',
    icon: <PlaylistAddCheckOutlined />
  },
  {
    label:'Empleados',
    href:'/staff',
    icon: <AccountBoxOutlined />
  },
  {
    label:'Candidatos',
    href:'/staff/candidates',
    icon: <GroupAddOutlined />
  },
  {
    label:'Facturas',
    href:'/cfdi',
    icon: <RequestQuoteOutlined />
  },
  
]