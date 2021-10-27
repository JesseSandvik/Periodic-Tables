import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
        <ul id="accordionSidebar">
          <li>
            <NavLink to="/dashboard" activeClassName="activeLink">
              <i className="fas fa-table"></i>
              <p>&nbsp;Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" activeClassName="activeLink">
            <i className="fas fa-search"></i>
              <p>&nbsp;Search</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reservations/new" activeClassName="activeLink">
            <i className="fas fa-glass-cheers"></i>
              <p>&nbsp;New Reservation</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tables/new" activeClassName="activeLink">
            <i className="fas fa-chair"></i>
              <p>&nbsp;New Table</p>
            </NavLink>
          </li>
        </ul>
    </nav>
  );
};