import type { ReactNode } from 'react';
import LogoIcon from '../../shared/assets/Logo/logo'
import styles from './MainPage.module.css'
import mainPageImage from '../../assets/mainPageImage.jpg'
import { ButtonUI } from '../../shared/ui/Button';


export function MainPage(): ReactNode {
  
  function fone (){
  window.location.href = "tel:+79539065877";
  }
  
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
        <div className={styles.mainpageContent}>
          <h2>Профессиональное восстановление и ремонт пневмоподвески в Санкт-Петербурге</h2>
          <p>Ремонтируем амортизаторы, пневмостойки, компрессоры и пневмобаллоны</p>

          <div className={styles.buttonContainer}>
            <ButtonUI children={
              `Получить бесплатную консультацию`
            } variant={`primary`} size={`small`}
            onClick={fone}
            />
          </div>
        </div>  

      </>  
  );
}