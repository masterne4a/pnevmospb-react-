import styles from "./Footer.module.css"

export function FooterUI() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__section}>
          <h2 className={styles.footer__title}>Контакты</h2>
          <address className={styles.address}>
            <span className={styles.address__place}>Санкт-Петербург, ул. Салова 21</span>
            <a href="tel:+79539065877" className={styles.address__link}>
              +7 953 906 5877
            </a>
            <a href="mailto:grk7108@yandex.ru" className={styles.address__link}>
              grk7108@yandex.ru
            </a>
          </address>
        </div>

        <div className={styles.footer__section}>
          <h2 className={styles.footer__title}>Время работы</h2>
          <ul className={styles.schedule}>
            <li className={styles.schedule__item}>
              Понедельник - Пятница: с 10 до 19
            </li>
            <li className={styles.schedule__item}>
              Суббота - Воскресенье: выходной
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}