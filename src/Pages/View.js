import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fireDb } from "../firebase";

const View = () => {
  const [state, setState] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setState({ ...snapshot.val() });
        } else {
          setState({});
        }
      });
  }, [id]);

  console.log(state);

  return (
    <div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          padding: "30px",
          background: "#f6f6f6",
          maxWidth: "50%",
          margin: "50px auto",
        }}
      >
        <h3>Contact Details</h3>
        <hr />

        <h4>
          <span>Name : </span>
          <span>{state.name}</span>
        </h4>
        <h4>
          <span>Email : </span>
          <span>{state.email}</span>
        </h4>
        <h4>
          <span>Contact : </span>
          <span>{state.contact}</span>
        </h4>

        <Link to="/">Back</Link>
      </div>
    </div>
  );
};

export default View;
