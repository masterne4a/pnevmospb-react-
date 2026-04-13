
import type { ButtonProps } from './types';
import styles from './Button.module.css'

export const ButtonUI = (props: ButtonProps) => {
  const {variant, size, children, ...rest} = props;
  return (
    <>
    <button className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]}`} {...rest}>{children}</button>
    </>
  );
}