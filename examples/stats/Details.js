import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/stats/Details.module.css";

const STAT  = `
{
  stat {
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

function StatDetails(props)
{
  const { stat_id }  = props.match.params;

  const qStat = useDetail(STAT, stat_id);

  if (qStat.loading) return <Loading />;
  if (qStat.error) return "Error";

  const { stat = {} } = qStat.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Prop1</label><br/>
      <label className={styles.txt}>{stat.prop1.toString()}</label>
      <br/>
      <label className={styles.lbl}>Prop2</label><br/>
      <label className={styles.txt}>{stat.prop2.toString()}</label>
      <br/>
      <label className={styles.lbl}>Prop3</label><br/>
      <label className={styles.txt}>{stat.prop3.toString()}</label>
      <br/>
      <label className={styles.lbl}>Prop4</label><br/>
      <label className={styles.txt}>{stat.prop4.toString()}</label>
      <br/>
      <label className={styles.lbl}>Comment</label><br/>
      <label className={styles.txt}>{stat.comment.toString()}</label>
      <br/>
    </div>
  );
}

export default StatDetails;
