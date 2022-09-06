import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import UserTypeDetails from "examples/user_types/Details";
import UserTypeList from "examples/user_types/List";
import UserTypeListOptions from "examples/user_types/options/List";
import UserTypeDetailsOptions from "examples/user_types/options/Details";
import UserTypeForm from "examples/user_types/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/examples/user_types/Panel.module.css";

function UserTypePanel(props)
{
  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <UserTypeListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <UserTypeList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <UserTypeDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <UserTypeDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <UserTypeForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:user_type_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:user_type_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default UserTypePanel;
