import { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Hibye | Inicio',
  description: 'Hibye Granjas',
}

const  Home=()=> {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.imageContainer}></div>
      </div>
    </div>
  )
}

export default Home