import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Apis/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const PopularPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sources, setSource] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("/source/top")
        .then((res) => {
          const sourceList = res.data;
          setSource(sourceList);
          setLoading(false);
        })
        .catch((err) => {
          navigate("/");
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

export default PopularPage;
