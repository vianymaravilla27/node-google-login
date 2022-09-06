import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";
import styles from "resources/css/examples/nav/Sidenav.module.css";

function Sidenav(props)
{
  const { url } = props.match;
  return (
    <div className={styles.module}>
      <header className={styles.header}>
        Seed Builder
        <div className={styles.subtitle}>Panel</div>
      </header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to={`${url}/businesses`}
              className={cx(styles.businessItem, styles.item)}
              activeClassName={styles.active}>
              Businesses
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/categories`}
              className={cx(styles.categoryItem, styles.item)}
              activeClassName={styles.active}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/stats`}
              className={cx(styles.statItem, styles.item)}
              activeClassName={styles.active}>
              Stats
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/users`}
              className={cx(styles.userItem, styles.item)}
              activeClassName={styles.active}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/user_types`}
              className={cx(styles.userTypeItem, styles.item)}
              activeClassName={styles.active}>
              User types
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/examples/logout"}
              className={cx(styles.item)}
              activeClassName={styles.active}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidenav;
