import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fireDb } from "../firebase";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

export const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const { name, email, contact } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please fill each fields");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact added successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact updated successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        padding: "30px",
        background: "#d9d9d9",
        maxWidth: "50%",
        margin: "50px auto",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Add Form</h3>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name" style={{ display: "block", margin: "30px 0" }}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name || ""}
          style={{ padding: 10, borderColor: "#f6f6f6", width: "300px" }}
          onChange={handleInputChange}
        />
        <label htmlFor="name" style={{ display: "block", margin: "30px 0" }}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email || ""}
          style={{ padding: 10, borderColor: "#f6f6f6", width: "300px" }}
          onChange={handleInputChange}
        />
        <label htmlFor="name" style={{ display: "block", margin: "30px 0" }}>
          Contact
        </label>
        <input
          type="number"
          id="contact"
          name="contact"
          value={contact || ""}
          style={{
            padding: 10,
            borderColor: "#f6f6f6",
            width: "300px",
          }}
          onChange={handleInputChange}
        />
        <button
          style={{
            display: "block",
            padding: "10px 45px",
            marginBlock: "40px",
            background: "#f15a24",
            color: "#fff",
            fontSize: "18px",
            border: "none",
            width: "100%",
            cursor: "pointer",
          }}
          type="submit"
        >
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
