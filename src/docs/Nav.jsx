import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="docs-nav">
      <ul>
        <li>
          <NavLink exact to="/docs">Documentation Home</NavLink>
        </li>
        <li>
          <NavLink to="/docs/schema">JSON Schemas</NavLink>
        </li>
        <li>
          <NavLink to="/docs/pdf">PDF Output</NavLink>
        </li>
        <li>
          <NavLink to="/docs/b18">Board18 Output</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;