import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "../Apis/axios";
import { SubscribButton } from "./SubscribButton";

const theme = createTheme();
const HomePage = () => {
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    (async () => {
      await axios
        .get("/source")
        .then((res) => {
          const sources = res.data;
          setSources(sources);
        })
        .catch((err) => {
          navigate("/Source");
        });
    })();
    (async () => {
      await axios
        .get(`/user/${auth?.user?._id}`, {
          headers: {
            authentication: `${auth?.token}`,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          const authList = res.data;
          setlist(authList);
          setLoading(false);
        })
        .catch((err) => {
          navigate("/Source");
        });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading === true ? (
        <div className="container">"loading....."</div>
      ) : (
        <ThemeProvider theme={theme}>
          <main>
            <Container sx={{ py: 8 }} maxWidth="xl">
              <Grid container spacing={3}>
                {sources.map((source, index) => (
                  <Grid item key={index} xs={12} sm={6} md={6}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          color="primary.main"
                        >
                          {source?.name}
                        </Typography>
                        <Typography fontSize={20} color="success.main">
                          <span style={{ color: "red" }}>Description:</span>
                          {source?.description}
                        </Typography>
                      </CardContent>
                      <CardActions className="d-flex justify-content-between">
                        <Link
                          to={`${source?.url}`}
                          style={{ textDecoration: "none" }}
                        >
                          Show More
                        </Link>
                        <SubscribButton
                          color={`${
                            list.includes(`${source.id}`) ? "error" : "primary"
                          }`}
                          sourseKey={source.id}
                          name={`${
                            list.includes(`${source.id}`) ? "unSub" : "sub"
                          }`}
                        />
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </ThemeProvider>
      )}
    </>
  );
};

export default HomePage;
