// components/Button.tsx
import React from 'react';
import styles from '../components/css/Button.module.css';

interface ButtonProps {
  label: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ label, link }) => {
  return <a href={link}><button className={styles.button}>{label}</button></a>;
};

export default Button;
