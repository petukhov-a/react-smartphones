import React, { FC } from 'react'
import { Smartphone } from '../redux/smartphones/types'

type SmartphomneSpecsProps = {
    item: Smartphone;
}

const SmartphoneSpecs: FC<SmartphomneSpecsProps> = ( {item} ) => {

  const {
    screenTypeFull,
    screenSize,
    screenResolution,
    processor,
    ram,
    internalStorage,
    networkSupport,
    fingerprintScanner,
    dimensions,
  } = item;

  return (
    <ul className="smartphone-card-specs">
    <li>
      <span>Экран&nbsp;</span>
      {screenTypeFull}, {screenSize}" ({screenResolution});
    </li>
    <li>
      <span>Процессор&nbsp;</span>
      {processor};
    </li>
    <li>
      <span>Память&nbsp;</span>оперативная {ram} ГБ, встроенная {internalStorage} ГБ;
    </li>
    <li>
      <span>Поддержка сетей&nbsp;</span>
      {networkSupport};
    </li>
    <li>
      <span>Сканер отпечатка пальцев&nbsp;</span>
      {fingerprintScanner};
    </li>
    <li>
      <span>Размеры (ШхВхТ)&nbsp;</span>
      {dimensions.width} х {dimensions.height} х {dimensions.thickness} мм;
    </li>
  </ul>
  )
}

export default SmartphoneSpecs