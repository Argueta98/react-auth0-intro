import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Footer() {
  const {user, isAuthenticated} = useAuth0();
  return (
    isAuthenticated && (
    <footer className="main-footer">
      <strong>
        Copyright © 2014-2021 <a href="https://adminlte.io">SOFTMASTER</a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
    )
  );
}

export default Footer;
