import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/stats/Form.module.css";

const USERS  = `
{
  users { }
}
`;

function StatForm(props)
{
  const [state, setState] = useState({});

  const { url } = props.match;
  const { stat_id }  = props.match.params;
  const editMode = stat_id != null;

  const saveOptions = {
    onCompleted: (data) =>
    {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_STAT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_STAT, saveOptions);

  const qStat = useDetail(queries.STAT, stat_id);
  const qUsers = useQuery(USERS);

  if (editMode && qStat.loading) return <Loading />;
  if (editMode && qStat.error) return "Error";

  const onSubmit = (values) =>
  {
    values.id = stat_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { stat = {} } = qStat.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Stat</div>
      <div className={styles.form}>
        <Formik
           initialValues={stat}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Prop1</label><br/>
          <Field type="number" name="prop1"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Prop2</label><br/>
          <Field type="number" name="prop2"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Prop3</label><br/>
          <Field type="number" name="prop3"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Prop4</label><br/>
          <Field type="number" name="prop4"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Comment</label><br/>
          <Field type="text" name="comment"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>User</label>
          <Field component="select" name="user.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
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

export default StatForm;
