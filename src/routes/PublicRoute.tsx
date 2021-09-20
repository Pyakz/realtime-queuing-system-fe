import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import FullScreenSpinner from "../components/common/FullScreenSpinner";
import { getAuthToken, removeAuthToken } from "../utils/token";

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    async function validateIfLoggedIn() {
      const token = await getAuthToken();

      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        await removeAuthToken();
      }
      setLoading(false);
    }
    validateIfLoggedIn();
  }, []);

  if (loading) {
    return <FullScreenSpinner />;
  } else {
    if (loggedIn && restricted) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <Route
          {...rest}
          render={(props) => {
            return Component ? (
              <Component {...props} />
            ) : (
              <Redirect to="/404" />
            );
          }}
        />
      );
    }
  }
};

export default PublicRoute;
