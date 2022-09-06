import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import StatDetails from "examples/stats/Details";
import StatList from "examples/stats/List";
import StatListOptions from "examples/stats/options/List";
import StatDetailsOptions from "examples/stats/options/Details";
import StatForm from "examples/stats/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/examples/stats/Panel.module.css";

function StatPanel(props)
{
  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <StatListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <StatList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <StatDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <StatDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <StatForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:stat_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:stat_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default StatPanel;
