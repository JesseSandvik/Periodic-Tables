import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
        <ul id="accordionSidebar">
          <li>
            <Link to="/dashboard">
            <i className="fas fa-table"></i>
              <p>&nbsp;Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/search">
            <i className="fas fa-search"></i>
              <p>&nbsp;Search</p>
            </Link>
          </li>
          <li>
            <Link to="/reservations/new">
            <i className="fas fa-glass-cheers"></i>
              <p>&nbsp;New Reservation</p>
            </Link>
          </li>
          <li>
            <Link to="/tables/new">
            <i className="fas fa-chair"></i>
              <p>&nbsp;New Table</p>
            </Link>
          </li>
        </ul>
    </nav>
  );
};