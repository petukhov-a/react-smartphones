import React from 'react';
import notFoundImg from '../../assets/img/not-found.jpg';
import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
        <img src={notFoundImg} alt="" />
        <Link to='/'>перейти на главную</Link>
    </div>
  )
}

export default NotFoundBlock;