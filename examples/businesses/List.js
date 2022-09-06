import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/businesses/List.module.css";

const BUSINESSES  = `
{
  businesses {
    name
    addressCords
    contact1
    contact2
    contact3
    contact4
    tags
    isLocal
    openingTime
    closingTime
    openDays
    verified
    user { }
    category { }
  }
}
`;

function BusinessList(props)
{
  const { url } = props.match;

  const qBusinesses = useQuery(BUSINESSES);

  if (qBusinesses.loading) return <Loading />;
  if (qBusinesses.error) return "Error";

  const { businesses } = qBusinesses.data;

  const businessList = businesses.map(item =>
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
      { businessList }
    </div>
  );
}

export default BusinessList;
