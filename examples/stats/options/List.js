import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import styles from "resources/css/examples/stats/options/List.module.css";

function StatListOptions(props)
{
  const { url } = props.match;
  return (
    <div className={styles.module}>
      <div className={styles.options}>
        <Link to={`${url}/new`}
          className={cx(styles.btn, styles.create)}>Create</Link>
      </div>
    </div>
  );
}

export default StatListOptions;

