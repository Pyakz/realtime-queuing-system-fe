import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../utils/token";
import { isEmpty } from "lodash";
import { useAuth } from "../context/AuthContext";
import FullScreenSpinner from "../components/common/FullScreenSpinner";
import jwtDecode from "jwt-decode";

function PrivateRoute({
  component: Component,
  role,
  componentProps,
  ...rest
}: any) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [AuthRole, setAuthRole] = useState<string | null>(null);
  const { setAuth } = useAuth();

  useEffect(() => {
    async function validate() {
      const token = await getAuthToken();
      try {
        if (token) {
          setLoggedIn(true);
          setLoading(false);
          const decoded: any = jwtDecode(token);
          setAuth(decoded);
          setAuthRole(decoded?.role);
        } else {
          if (isEmpty(token)) {
            setLoggedIn(false);
            setLoading(false);
            await removeAuthToken();
          }
        }
      } catch (error) {
        setLoggedIn(false);
        setLoading(false);
        removeAuthToken();
      }
    }

    validate();
  }, [setAuth]);

  return loading ? (
    <FullScreenSpinner />
  ) : loggedIn ? (
    role.some((role: any) => role === AuthRole) && (
      <Route
        {...rest}
        render={(props) => {
          return Component ? (
            <Component {...componentProps} {...props} />
          ) : (
            <Redirect to="/404" />
          );
        }}
      />
    )
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
