import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/examples/businesses/Details.module.css";

const BUSINESS  = `
{
  business {
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

function BusinessDetails(props)
{
  const { business_id }  = props.match.params;

  const qBusiness = useDetail(BUSINESS, business_id);

  if (qBusiness.loading) return <Loading />;
  if (qBusiness.error) return "Error";

  const { business = {} } = qBusiness.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{business.name.toString()}</label>
      <br/>
      <label className={styles.lbl}>Address cords</label><br/>
      <label className={styles.txt}>{business.addressCords.toString()}</label>
      <br/>
      <label className={styles.lbl}>Contact1</label><br/>
      <label className={styles.txt}>{business.contact1.toString()}</label>
      <br/>
      <label className={styles.lbl}>Contact2</label><br/>
      <label className={styles.txt}>{business.contact2.toString()}</label>
      <br/>
      <label className={styles.lbl}>Contact3</label><br/>
      <label className={styles.txt}>{business.contact3.toString()}</label>
      <br/>
      <label className={styles.lbl}>Contact4</label><br/>
      <label className={styles.txt}>{business.contact4.toString()}</label>
      <br/>
      <label className={styles.lbl}>Tags</label><br/>
      <label className={styles.txt}>{business.tags.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is local</label><br/>
      <label className={styles.txt}>{business.isLocal.toString()}</label>
      <br/>
      <label className={styles.lbl}>Opening time</label><br/>
      <label className={styles.txt}>{business.openingTime.toString()}</label>
      <br/>
      <label className={styles.lbl}>Closing time</label><br/>
      <label className={styles.txt}>{business.closingTime.toString()}</label>
      <br/>
      <label className={styles.lbl}>Open days</label><br/>
      <label className={styles.txt}>{business.openDays.toString()}</label>
      <br/>
      <label className={styles.lbl}>Verified</label><br/>
      <label className={styles.txt}>{business.verified.toString()}</label>
      <br/>
    </div>
  );
}

export default BusinessDetails;
