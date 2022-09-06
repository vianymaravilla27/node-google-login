import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/stats/List.module.css";

const STATS  = `
{
  stats {
    prop1
    prop2
    prop3
    prop4
    comment
    business { }
    user { }
  }
}
`;

function StatList(props)
{
  const { url } = props.match;

  const qStats = useQuery(STATS);

  if (qStats.loading) return <Loading />;
  if (qStats.error) return "Error";

  const { stats } = qStats.data;

  const statList = stats.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { statList }
    </div>
  );
}

export default StatList;
