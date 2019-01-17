import React from 'react';
import Navigation from '../components/navigation';

export default () => (
  <footer className="py1">
    <div className="align-left">
      <Navigation />
    </div>

    <div className="center p1">
      <span className="p1">
        &copy;{new Date().getFullYear()} Sasha Khamkov | All rights reserved
      </span>
    </div>
  </footer>
);
