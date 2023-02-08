import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainCard from "./MainCard";
import { Link } from "react-router-dom";
import axios from "../Apis/axios";

const theme = createTheme();

const HomePage = () => {
  const navigate = useNavigate();
  const [articales, setArticales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      await axios
        .get("/articale")
        .then((res) => {
          const authArticals = res.data;
          setArticales(authArticals);
          setLoading(false);
        })
        .catch((err) => {
          window.location.reload(true);
          navigate("/");
        });
    };
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading === true ? (
        <div className="container">"loading....."</div>
      ) : (
        <ThemeProvider theme={theme}>
          <main>
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="xl">
                <MainCard />
              </Container>
            </Box>

            <Container sx={{ py: 8 }} maxWidth="xl">
              <Grid container spacing={3}>
                {articales.map((articale, index) => (
                  <Grid item key={index} xs={12} sm={6} md={6}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={articale?.urlToImage}
                        alt="Image"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          color="primary.main"
                        >
                          {articale?.title}
                        </Typography>
                        <Typography fontSize={20} color="success.main">
                          Published By:{articale?.author}
                        </Typography>
                        <Typography color="secondary.main">
                          Published in: {articale?.publishedAt.substring(0, 10)}
                        </Typography>
                        <Typography>
                          <span style={{ color: "red" }}>Description:</span>{" "}
                          {articale?.description}
                        </Typography>
                        <Typography>
                          <span style={{ color: "red" }}>Content:</span>{" "}
                          {articale?.content}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link
                          to={`${articale?.url}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button size="small">Show More</Button>
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

export default HomePage;
