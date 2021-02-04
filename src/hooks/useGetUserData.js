import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const useGetUserData = () => {
  const [user, setUser] = useState(null);
  var base64Url = Cookies.get('token').split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const { _id, name } = JSON.parse(jsonPayload);
  useEffect(() => {
    fetch('http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({
        query: `{
          getUser(id: \"${_id}\") {
            _id,
            name,
            username
          }
        }`
      })
    })
      .then(response => response.json())
      .then(body => console.log(body))
  });
  return user;
};

export default useGetUserData;