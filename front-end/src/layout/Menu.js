
import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav>
        <Link to="/">
            <span>Periodic Tables</span>
        </Link>
        <ul id="accordionSidebar">
          <li>
            <Link to="/dashboard">
              &nbsp;Dashboard
            </Link>
          </li>
          <li>
            <Link to="/search">
              &nbsp;Search
            </Link>
          </li>
          <li>
            <Link to="/reservations/new">
              &nbsp;New Reservation
            </Link>
          </li>
          <li>
            <Link to="/tables/new">
              &nbsp;New Table
            </Link>
          </li>
        </ul>
    </nav>
  );
}

export default Menu;