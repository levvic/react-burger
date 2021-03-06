import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from 'react-router-dom';
import styles from './order-info-details.module.css';
import Preloader from "../preloader/preloader";
import { getOrderInfoDetails } from '../../services/actions/ws';

export const OrdersInfoDetails = ({ isPopup }) => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams();
  const { orderInfo } = useSelector((store) => store.ordersInfoFeed);
  const { ingredientsArray } = useSelector((store) => store.ingredients);

  const foundIngredients = orderInfo?.ingredients.map((orderIngredient) => ingredientsArray.find((ingredient) => ingredient._id === orderIngredient));

  const calculateSum = () => {
    let sum = 0;
    foundIngredients?.forEach((ingredient) => {
      const orderedIngredient = ingredientsArray.find((orderIngredient) => orderIngredient?._id === ingredient?._id);
      if (orderedIngredient?.price) {
        sum += orderedIngredient.price;
      }
    });
    return sum;
  };

  const checkStatus = (status) => {
    if (status === 'pending') {
      return 'Готовится';
    }
    return 'Выполнен';
  };

  const checkStyles = (status) => {
    if (status === 'pending') {
      return {
        color: '#00CCCC',
      };
    }
    return {};
  };

  function formatDate(str) {
    return new Date(str).toLocaleString();
  }

  useEffect(() => {
    orderNumber && dispatch(getOrderInfoDetails(+orderNumber));
  }, [dispatch, orderNumber]);

  return (

    orderInfo?.number ? (
      <div className={styles.container} style={!isPopup ? { marginTop: '120px' } : {}}>
        <div className={styles.order_info}>
          <p
            className={`text text_type_digits-default pb-10 ${styles.order_number}`}
          >
            #
            {
                orderInfo && orderInfo.number
              }

          </p>
          <h2 className="text text_type_main-medium pb-3">
            {
                orderInfo && orderInfo.name
              }
          </h2>

          <p
            className={`text text_type_main-default pb-15 ${styles.order_status}`}
            style={checkStyles(orderInfo?.status)}
          >
            {
                checkStatus(orderInfo?.status)
              }
          </p>

          <p className="text text_type_main-medium pb-6">Состав:</p>
          <ul className={styles.list}>
            {
                  Array.from(new Set(foundIngredients))?.map((ingredient, idx) => (
                    <li key={idx} className={styles.list_item}>
                      <img className={styles.image} src={ingredient?.image} alt="" />
                      <h3
                        className={`text text_type_main-default ${styles.title}`}
                      >
                        {ingredient?.name}
                      </h3>
                      <div className={`text text_type_digits-default ${styles.item_currency}`}>
                        <span>
                          {
                              foundIngredients && foundIngredients?.filter((filteredIngredient) => filteredIngredient?._id === ingredient?._id).length
                            }
                        </span>
                        x
                        <div className={`text text_type_digits-default ${styles.item_currency_container}`}>
                          <span>{ingredient?.price}</span>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    </li>
                  ))
                }
          </ul>
          <div className={styles.footer}>
            <p className="text text_type_main-default text_color_inactive">
              {
                  formatDate(orderInfo?.createdAt)
                }

            </p>
            <div className={styles.currency_container}>
              <span className="text text_type_digits-default">
                {
                    calculateSum()
                  }

              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    ) : <Preloader />

  );
};