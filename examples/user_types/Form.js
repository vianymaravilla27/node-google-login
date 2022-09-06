import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/user_types/Form.module.css";

function UserTypeForm(props)
{
  const [state, setState] = useState({});

  const { url } = props.match;
  const { user_type_id }  = props.match.params;
  const editMode = user_type_id != null;

  const saveOptions = {
    onCompleted: (data) =>
    {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_USER_TYPE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_USER_TYPE, saveOptions);

  const qUserType = useDetail(queries.USER_TYPE, user_type_id);

  if (editMode && qUserType.loading) return <Loading />;
  if (editMode && qUserType.error) return "Error";

  const onSubmit = (values) =>
  {
    values.id = user_type_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { userType = {} } = qUserType.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>User type</div>
      <div className={styles.form}>
        <Formik
           initialValues={userType}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label>
          <Field component="select" name="name.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="OWNER">OWNER</option>
            <option value="CLIENT">CLIENT</option>
          </Field>
          <br/>
          
          {state.error ?
            <div className={styles.error}>{state.error}</div> : null}
          <button type="submit" className={styles.submit}>Send</button>
        </form>
        )}
        />
      </div>
    </div>
  );
}

export default UserTypeForm;
