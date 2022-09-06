import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/user_types/List.module.css";

const USER_TYPES  = `
{
  userTypes {
    name
    user { }
  }
}
`;

function UserTypeList(props)
{
  const { url } = props.match;

  const qUserTypes = useQuery(USER_TYPES);

  if (qUserTypes.loading) return <Loading />;
  if (qUserTypes.error) return "Error";

  const { userTypes } = qUserTypes.data;

  const userTypeList = userTypes.map(item =>
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
      { userTypeList }
    </div>
  );
}

export default UserTypeList;
