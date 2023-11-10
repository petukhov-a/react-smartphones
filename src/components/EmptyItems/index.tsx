import React, { FC } from 'react';
import styles from './EmptyItems.module.scss';
import { Link } from 'react-router-dom';

type EmptyItemsProps = {
    text: string;
    img: any;
}

const EmptyItems: FC<EmptyItemsProps> = ( {text, img} ) => {
  return (
    <div className={styles.root}>
        <img src={img} />
        <h2>{text}</h2>
        <Link to='/'>перейти на главную</Link>
    </div>
  )
}

export default EmptyItems;