import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/user_types/Details.module.css";

const USER_TYPE  = `
{
  userType {
    name
    user { }
  }
}
`;

function UserTypeDetails(props)
{
  const { user_type_id }  = props.match.params;

  const qUserType = useDetail(USER_TYPE, user_type_id);

  if (qUserType.loading) return <Loading />;
  if (qUserType.error) return "Error";

  const { userType = {} } = qUserType.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{userType.name.toString()}</label>
      <br/>
    </div>
  );
}

export default UserTypeDetails;
