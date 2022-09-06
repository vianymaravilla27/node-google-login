import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/categories/List.module.css";

const CATEGORIES  = `
{
  categories {
    name
  }
}
`;

function CategoryList(props)
{
  const { url } = props.match;

  const qCategories = useQuery(CATEGORIES);

  if (qCategories.loading) return <Loading />;
  if (qCategories.error) return "Error";

  const { categories } = qCategories.data;

  const categoryList = categories.map(item =>
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
      { categoryList }
    </div>
  );
}

export default CategoryList;
