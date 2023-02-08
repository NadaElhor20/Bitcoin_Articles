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

const theme = createTheme();

const MyListPage = () => {
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
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
        })
        .catch((err) => {
          navigate("/users/signin");
        });
    })();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
useEffect(()=>{
  (async () => {
    await axios
      .get("/source")
      .then((res) => {
        const soursesList = res.data;
        const result = list.map((item) => {
          const matchedObject = soursesList.find(
            (option) => option.id === item
          );
          return matchedObject;
        });
        setSources(result);
        setLoading(false)
      })
      .catch((err) => {
        navigate("/users/signin");
        window.location.reload(true);
      });
  })();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[list])
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
              <Grid
                item
                key={index}
              >
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
                      variant="h4"
                      component="h4"
                      color="primary.main"
                    >
                      {source?.name}
                    </Typography>
                    <Typography>
                      <span style={{ color: "red", fontSize: "20px" }}>
                        Description:
                      </span>
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
    </ThemeProvider>)}
    </>
  );
};

export default MyListPage;
