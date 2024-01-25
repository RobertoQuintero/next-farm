import { Metadata } from 'next'
import styles from './page.module.css'
import HomePage from './components/HomePage'

export const metadata: Metadata = {
  title: 'Hibye | Inicio',
  description: 'Hibye Granjas',
}

const  Home=()=> <HomePage/>

export default Home