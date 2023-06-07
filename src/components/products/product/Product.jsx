import React, { useEffect } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "../productFilter";
import ProductList from "../productList";
import { UseFetchCollection } from "../../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import { Loader } from "../../../components";
import { HiOutlineSortDescending } from "react-icons/hi";

export const Product = () => {
  const { data, isLoading } = UseFetchCollection("products");

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={`${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? <Loader /> : <ProductList products={products} />}
          {isLoading ? (
            <Loader />
          ) : (
            <div className={styles.icon}>
              <HiOutlineSortDescending size={30} color="orangered" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
