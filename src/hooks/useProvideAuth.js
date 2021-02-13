import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const loginUser = (username, password) => {
    fetch("http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
          login(username: "${username}", password: "${password}")
        }`,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        Cookies.set("token", body.data.login);
        var base64Url = Cookies.get("token").split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const { _id, name } = JSON.parse(jsonPayload);
        setUser({
          id: _id,
          name,
        });
      });
  };
  const getUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const { _id, name } = JSON.parse(jsonPayload);
      fetch("http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          query: `{
          getUser(id: \"${_id}\") {
            _id,
            name,
            username
          }
        }`,
        }),
      })
        .then((response) => response.json())
        .then((body) => console.log(body));
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return {
    user,
    loginUser,
  };
};

export default useProvideAuth;
