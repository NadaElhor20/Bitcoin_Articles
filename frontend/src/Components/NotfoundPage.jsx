import React from "react";
import { Link } from "react-router-dom";

const NotfoundPage = () => {
  return (
    <div className="container d-flex m-6">
      <h1>
        Sorry. Page Not Found. Back to
        <span>
          <Link to={"/Home"} style={{ textDecoration: "none" }}>
            main page
          </Link>
        </span>
      </h1>
    </div>
  );
};

export default NotfoundPage;
