import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "../Apis/axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [historys, setHistorys] = useState([]);
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    (async () => {
      await axios
        .get("/users/profile", {
          headers: {
            authentication: `${auth?.token}`,
            "content-type": "application/json",
          },
        })
        .then((res) => {
          setHistorys(res.data.logs);
        })
        .catch((err) => {
          navigate("/users/signin");
        });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className=" container
    
    "
      >
        <Card className="w-75 p-3">
          <ListGroup variant="flush">
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h4"
              component="div"
              className="text-primary"
            >
              My Profile
            </Typography>
            <ListGroup.Item className="text-success">
              Username:{" "}
              <span className="text-dark">{auth?.user?.username}</span>{" "}
            </ListGroup.Item>
            <ListGroup.Item className="text-success">
              Email: <span className="text-dark">{auth?.user?.email}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <div className="w-75 p-3">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h4"
            id="tableTitle"
            component="div"
            className="text-primary"
          >
            Login History
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-success">Status</TableCell>
                  <TableCell className="text-success">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historys.map((history, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {history.message}
                    </TableCell>
                    <TableCell>{history.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
