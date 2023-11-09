import React from 'react';
import notFoundImg from '../../assets/img/not-found.jpg';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
        <img src={notFoundImg} alt="" />
    </div>
  )
}

export default NotFoundBlock;