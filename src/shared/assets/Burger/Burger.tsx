import styles from './Burger.module.css'

export function BurgerUI () {
  return(
    <>
    <div className={styles.burgerContainer}>
      <div className={styles.burger}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
    </>
  )
}