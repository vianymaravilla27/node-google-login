import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/categories/Details.module.css";

const CATEGORY  = `
{
  category {
    name
  }
}
`;

function CategoryDetails(props)
{
  const { category_id }  = props.match.params;

  const qCategory = useDetail(CATEGORY, category_id);

  if (qCategory.loading) return <Loading />;
  if (qCategory.error) return "Error";

  const { category = {} } = qCategory.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{category.name.toString()}</label>
      <br/>
    </div>
  );
}

export default CategoryDetails;
