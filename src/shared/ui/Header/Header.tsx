import styles from './Header.module.css'
import { BurgerUI } from '../../assets/Burger/Burger'
import LogoIcon from '../../assets/Logo/logo'

export function HeaderUI () {
  return (
    <header className={styles.header}>
      <LogoIcon w={80} h={80}/>
      <span>
      <h1>ПневмоСПБ</h1>
      <p>Центр пневмоподвески</p>
      </span>
      <address className={styles.address}>
        <a href="tel:+79539065877" className={styles.address_link}>+7 953 906 5877</a>
        <br />
        <span className={styles.address_place}>Санкт-Петербург, ул.Салова 21</span>
      </address>
      <BurgerUI />
    </header>
  )
}