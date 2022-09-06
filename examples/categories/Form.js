import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/categories/Form.module.css";

function CategoryForm(props)
{
  const [state, setState] = useState({});

  const { url } = props.match;
  const { category_id }  = props.match.params;
  const editMode = category_id != null;

  const saveOptions = {
    onCompleted: (data) =>
    {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_CATEGORY, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_CATEGORY, saveOptions);

  const qCategory = useDetail(queries.CATEGORY, category_id);

  if (editMode && qCategory.loading) return <Loading />;
  if (editMode && qCategory.error) return "Error";

  const onSubmit = (values) =>
  {
    values.id = category_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { category = {} } = qCategory.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Category</div>
      <div className={styles.form}>
        <Formik
           initialValues={category}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label>
          <Field component="select" name="name.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="SALUD">salud</option>
            <option value="ENTRETENIMIENTO">entretenimiento</option>
            <option value="ABARROTES">abarrotes</option>
            <option value="CUIDADO PERSONAL">cuidado personal</option>
            <option value="BELLEZA">belleza</option>
            <option value="ACTIVIDAD FISICA">actividad fisica</option>
            <option value="CONSTRUCCION Y MANTENIMIENTO">construccion y mantenimiento</option>
            <option value="TRANSPORTE">transporte</option>
            <option value="RESTAURANTES">restaurantes</option>
            <option value="COMIDA">comida</option>
            <option value="CONTRATISTAS">contratistas</option>
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

export default CategoryForm;
