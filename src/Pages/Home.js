import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { fireDb } from "../firebase";

const Home = () => {
  const [data, setData] = useState({});
  const { currentUser } = useAuth();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("search");

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const filterData = [
    ...Object.keys(data).filter((item) =>
      search === "all"
        ? item
        : data[item].name.toLowerCase().trim().includes(search)
    ),
  ];

  const onDelete = (id) => {
    if (window.confirm("Are you want to delete?")) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact deleted successfully");
        }
      });
    }
  };

  const profile = {
    name: currentUser.multiFactor.user.displayName || "User",
    profileImg: currentUser.multiFactor.user.photoURL || "",
  };

  console.log(profile);

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
        <img style={{ borderRadius: "50%" }} src={profile.profileImg} alt="" />
        <h1>Hi, {profile.name}</h1>
        <h3>Contacts</h3>

        <div className="contact-item">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((id, index) => {
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td style={{ display: "flex" }}>
                      <Link
                        to={`/update/${id}`}
                        style={{
                          background: "#6b81ed",
                          margin: "0 5px",
                          padding: "5px 15px",
                          borderRadius: "2px",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(id)}
                        style={{
                          background: "#e92121",
                          margin: "0 5px",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",

                          padding: "5px 15px",
                          borderRadius: "2px",
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/view/${id}`}
                        style={{
                          background: "#21e9e9",
                          margin: "0 5px",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                          padding: "5px 15px",
                          borderRadius: "2px",
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {filterData.length === 0 && (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
