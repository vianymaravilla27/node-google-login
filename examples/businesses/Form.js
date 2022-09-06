import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/businesses/Form.module.css";

const USERS  = `
{
  users { }
}
`;

const CATEGORIES  = `
{
  categories { }
}
`;

function BusinessForm(props)
{
  const [state, setState] = useState({});

  const { url } = props.match;
  const { business_id }  = props.match.params;
  const editMode = business_id != null;

  const saveOptions = {
    onCompleted: (data) =>
    {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_BUSINESS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_BUSINESS, saveOptions);

  const qBusiness = useDetail(queries.BUSINESS, business_id);
  const qUsers = useQuery(USERS);
  const qCategories = useQuery(CATEGORIES);

  if (editMode && qBusiness.loading) return <Loading />;
  if (editMode && qBusiness.error) return "Error";

  const onSubmit = (values) =>
  {
    values.id = business_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { business = {} } = qBusiness.data;
  const { users = [] } = qUsers.data;
  const { categories = [] } = qCategories.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Business</div>
      <div className={styles.form}>
        <Formik
           initialValues={business}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label><br/>
          <Field type="text" name="name"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Address cords</label><br/>
          <Field type="text" name="addressCords"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Contact1</label><br/>
          <Field type="text" name="contact1"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Contact2</label><br/>
          <Field type="text" name="contact2"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Contact3</label><br/>
          <Field type="text" name="contact3"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Contact4</label><br/>
          <Field type="text" name="contact4"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Tags</label><br/>
          <Field type="text" name="tags"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Is local</label>
          <Field type="checkbox" name="isLocal"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Opening time</label>
          <Field type="date" name="openingTime"
            className={styles.dte} />
          <br/>
          
          <label className={styles.lbl}>Closing time</label>
          <Field type="date" name="closingTime"
            className={styles.dte} />
          <br/>
          
          <label className={styles.lbl}>Open days</label><br/>
          <Field type="text" name="openDays"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Verified</label>
          <Field type="checkbox" name="verified"
            className={styles.chk} />
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
          
          <div>
          <label className={styles.lbl}>Category</label>
          <Field component="select" name="category.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { categories.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default BusinessForm;
