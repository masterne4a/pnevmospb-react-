import type { ReactNode } from 'react';
import LogoIcon from '../../shared/assets/Logo/logo'
import styles from './MainPage.module.css'
import mainPageImage from '../../assets/mainPageImage.jpg'


export function MainPage(): ReactNode {
  return (
      <>
        <div className={styles.headerContent}>
          <LogoIcon w={90} h={90}/>
          <span>
            <h1>ПневмоСПБ</h1>
            <p>Центр пневмоподвески</p>
          </span>
        </div>
        <img src={mainPageImage} alt='фото автосервиса' className={styles.mainPageImage}></img>
        <h2>Профессиональное восстановление и ремонт пневмоподвески в Санкт-Петербурге</h2>
        <p>Ремонтируем амортизаторы, пневмостойки, компрессоры и пневмобаллоны</p>
        {/* сделать кнопку отдельным элементом*/}
        <div className="hero__button_section">
          <button type="button" className="hero__button phone_button">
            Получить бесплатную консультацию
          </button>
        </div>  
      </>  
  );
}