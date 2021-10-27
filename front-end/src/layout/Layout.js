import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Routes from './Routes';

export default function Layout() {
  return (
    <article>
      <header>
        <div className="siteIntro">
          <Link to="/">
            <h1>Periodic Tables</h1>
          </Link>
          <small>A Restaurant Reservation Management Application</small>
        </div>
        <Navigation />
      </header>
      <main>
        <Routes />
      </main>
    </article>
  );
};