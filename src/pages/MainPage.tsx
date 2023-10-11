import { FC } from "react";
import Sort from "../components/Sort";

import React from 'react'
import SmartphoneCard from "../components/SmartphoneCard";

const MainPage: FC = () => {
  return (
    <div className="smartphones">
      <div className="container">
        <div className="smartphones-header">
          <div className="smartphones-header-heading">
            <h3 className="smartphones-header__title">Смартфоны</h3>
            <span className="smartphones-header__count">10 товаров</span>
          </div>
          <button className="smartphones-header__mobile-filter-btn">Фильтры</button>
        </div>
       <Sort />
        <div className="smartphones-content">
          <div className="smartphones-content-cards">
            <SmartphoneCard />
            <SmartphoneCard />
            <SmartphoneCard />
            <SmartphoneCard />
          </div>
          <div className="smartphones-filter">
            <h1 className="smartphones-filter__heading">Фильтры</h1>

            <details className="smartphones-filter-item" open>
              <summary className="smartphones-filter-item__heading">
                <span>Цена</span>
                <img className="drop-down-arrow" src="./img/arrow.svg" alt="" />
              </summary>
              <div className="price-inputs">
                <input type="number" className="checkbox-input" value="2490" />
                <span>–</span>
                <input type="number" className="checkbox-input" value="199990" />
              </div>
            </details>

            <details className="smartphones-filter-item" open>
              <summary className="smartphones-filter-item__heading">
                <span>Встроенная память</span>
                <img className="drop-down-arrow" src="./img/arrow.svg" alt="" />
              </summary>
              <ul className="smartphones-filter-item-list">
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    64 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    128 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    256 ГБ
                  </label>
                </li>
              </ul>
            </details>

            <details className="smartphones-filter-item" open>
              <summary className="smartphones-filter-item__heading">
                <span>Оперативная память</span>
                <img className="drop-down-arrow" src="./img/arrow.svg" alt="" />
              </summary>
              <ul className="smartphones-filter-item-list">
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />2 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />4 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />6 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />8 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    10 ГБ
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    12 ГБ
                  </label>
                </li>
              </ul>
            </details>

            <details className="smartphones-filter-item" open>
              <summary className="smartphones-filter-item__heading">
                <span>Бренд</span>
                <img className="drop-down-arrow" src="./img/arrow.svg" alt="" />
              </summary>
              <ul className="smartphones-filter-item-list">
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    DOOGEE
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    Apple
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    ITEL
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    Relame
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    Samsung
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    Xiaomi
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    TECNO
                  </label>
                </li>
              </ul>
            </details>

            <details className="smartphones-filter-item" open>
              <summary className="smartphones-filter-item__heading">
                <span>Тип экрана</span>
                <img className="drop-down-arrow" src="./img/arrow.svg" alt="" />
              </summary>
              <ul className="smartphones-filter-item-list">
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    OLED
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    IPS
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" name="RAM" />
                    AMOLED
                  </label>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;