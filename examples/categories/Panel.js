import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import CategoryDetails from "examples/categories/Details";
import CategoryList from "examples/categories/List";
import CategoryListOptions from "examples/categories/options/List";
import CategoryDetailsOptions from "examples/categories/options/Details";
import CategoryForm from "examples/categories/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/examples/categories/Panel.module.css";

function CategoryPanel(props)
{
  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <CategoryListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <CategoryList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <CategoryDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <CategoryDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <CategoryForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:category_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:category_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default CategoryPanel;
