import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "../Apis/axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState();
  const [source, setSource] = useState();
  const [navItems, setNavItem] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const itemPath = {
    "Sign Up": "/users/signup",
    "Sign In": "/users/signin",
    "Log Out": "/",
    "Hi,": "/users/profile",
    "My List": "/users/list",
  };
  useEffect(() => {
    (async () => {
      await axios
        .get("/users/profile", {
          headers: {
            authentication: `${auth?.token}`,
            "content-type": "application/json",
          },
        })
        .then(() => {
          setNavItem(["Hi,", "My List", "Log Out"]);
          setPath("/");
          setSource("/AuthSource");
        })
        .catch((err) => {
          setNavItem(["Sign Up", "Sign In"]);
          setPath("/");
          setSource("/Source");
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function greetUser(e) {
    if (e.target.value === "Log Out") {
      localStorage.removeItem("auth");
      navigate("/", { replace: true });
      window.location.reload(true);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav">
          <Toolbar>
            <Box
              className="d-flex"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Typography
                //
                variant="h6"
                component="div"
                // sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <Link
                  key="Home"
                  to={`${path}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                style={{ paddingLeft: "20px" }}
                // sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <Link
                  key="source"
                  to={`${source}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Source
                </Link>
              </Typography>
              <Typography
                variant="h6"
                component="div"
                style={{ paddingLeft: "20px" }}
              >
                <Link
                  key="popular"
                  to={"/articale/top"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Popular
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => {
                const itemName =
                  item === "Hi,"
                    ? item.concat(` ${auth?.user?.username}`)
                    : item;
                return (
                  <Link
                    key={item}
                    to={`${itemPath[item]}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={greetUser}
                      value={item}
                      key={item}
                      sx={{ color: "#fff" }}
                    >
                      {itemName}
                    </Button>
                  </Link>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}></Box>
    </>
  );
};
export default NavBar;
