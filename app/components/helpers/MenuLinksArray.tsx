import { 
  AccountBoxOutlined,
  AddTaskOutlined,
  AssessmentOutlined,
  EqualizerOutlined,
  FormatListNumberedOutlined,
  GroupAddOutlined, 
  InventoryOutlined, 
  PlaylistAddCheckOutlined, 
  QueryStatsOutlined, 
  SavingsOutlined,
  TaskAltOutlined} from '@mui/icons-material';

interface MenuLinkElement {
  label:string;
  href:string;
  icon: JSX.Element
}

export const menuLinksArray:MenuLinkElement[]=[
  {
    label:'Reporte general',
    href:'/farms/custom/general',
    icon: <QueryStatsOutlined />
  },
  {
    label:'Reporte gestantes',
    href:'/farms/custom/reports',
    icon: <AssessmentOutlined />
  },
  {
    label:'Bitácora cerdas',
    href:'/farms/custom',
    icon: <PlaylistAddCheckOutlined />
  },
  {
    label:'Bitácora Lechones',
    href:'/farms/custom/piglets',
    icon: <FormatListNumberedOutlined />
  },
  {
    label:'Bitácora Crecimiento',
    href:'/farms/custom/growing_pigs',
    icon: <SavingsOutlined />
  },
  {
    label:'Bitácora Actividades',
    href:'/farms/custom/tasks',
    icon: <AddTaskOutlined />
  },
  {
    label:'Estadísticas',
    href:'/farms/custom/statics',
    icon: <EqualizerOutlined />
  },
  {
    label:'Productos',
    href:'/farms/custom/products',
    icon: <InventoryOutlined />
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

