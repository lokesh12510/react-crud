import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../Context/AuthContext";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  const [search, setSearch] = useState("all");

  const history = useHistory();

  const { googleLogout } = useAuth();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("addList");
    } else {
      setActiveTab("view");
    }

    history.push({ search: `?search=${search}` });
  }, [location.pathname, search]);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearch(e);
    history.push({ search: `?search=${search}` });
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f15a24",
        color: "#fff",
        padding: "5px 15px",
      }}
    >
      <Link
        to="/"
        style={{ color: "#fff", marginRight: "30px", padding: "10px" }}
      >
        ReactCrud
      </Link>
      <form action="" onSubmit={handleSubmitSearch}>
        <input
          style={{ padding: "8px", width: "300px", border: "none" }}
          type="text"
          placeholder="Search name..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <div
        className="nav-right"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f15a24",
          color: "#fff",
        }}
      >
        <Link
          to="/add"
          onClick={() => setActiveTab("addList")}
          style={{ color: "#fff", marginRight: "30px", padding: "10px" }}
          className={`${activeTab === "addList" ? "active" : ""} `}
        >
          Add List
        </Link>
        <button
          onClick={googleLogout}
          style={{
            color: "#f15a24",
            marginRight: "30px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
