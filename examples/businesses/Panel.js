import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import BusinessDetails from "examples/businesses/Details";
import BusinessList from "examples/businesses/List";
import BusinessListOptions from "examples/businesses/options/List";
import BusinessDetailsOptions from "examples/businesses/options/Details";
import BusinessForm from "examples/businesses/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/examples/businesses/Panel.module.css";

function BusinessPanel(props)
{
  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <BusinessListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <BusinessList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <BusinessDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <BusinessDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <BusinessForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:business_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:business_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default BusinessPanel;
