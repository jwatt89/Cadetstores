import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">UniformAdmin</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/stores" className="nav-link">Manage Stores</Link>
          </li>
          <li className="navbar-item">
          <Link to="/scores" className="nav-link">Inspections</Link>
          </li>
          <li className="navbar-item">
          <Link to="/demand" className="nav-link">Uniform Demands</Link>
          </li>
          <li className="navbar-item">
          <Link to="/cadets" className="nav-link">Cadets</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}