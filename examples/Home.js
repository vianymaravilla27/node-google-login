import React, { useEffect } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
import BusinessPanel from "examples/businesses/Panel";
import CategoryPanel from "examples/categories/Panel";
import StatPanel from "examples/stats/Panel";
import UserPanel from "examples/users/Panel";
import UserTypePanel from "examples/user_types/Panel";
import Sidenav from "examples/nav/Sidenav";
import Topnav from "examples/nav/Topnav";
import styles from "resources/css/examples/Home.module.css";

function Home(props)
{
  const { path } = props.match;

   useEffect(() => {
     const userId = sessionStorage.getItem("id");
     if (userId == null)
       return props.history.replace("/examples/login");
   });

  return (
    <div className={styles.module}>
      <div className={styles.drawer}>
        <div className={styles.sidenav}>
          <Route path={`${path}`}
            component={Sidenav} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.topnav}>
          <Route path={`${path}`}
            component={Topnav} />
        </div>
        <div className={styles.content}>
           <Switch>
             <Route path={`${path}/businesses`}
               component={BusinessPanel} />
             <Route path={`${path}/categories`}
               component={CategoryPanel} />
             <Route path={`${path}/stats`}
               component={StatPanel} />
             <Route path={`${path}/users`}
               component={UserPanel} />
             <Route path={`${path}/user_types`}
               component={UserTypePanel} />
           </Switch>
        </div>
      </div>
    </div>
   );
}

export default Home;
