import React from "react";
import Card from "react-bootstrap/Card";

const MainCard = () => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={"https://ichef.bbci.co.uk/news/976/cpsprodpb/E4DB/production/_123878585_gettyimages-1238681687.jpg"}
        alt="Image"
      />
      <Card.Body>
        <Card.Text>
        All articles about Bitcoin.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MainCard;
