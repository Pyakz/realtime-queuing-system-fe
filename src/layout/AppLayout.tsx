import { useAuth } from "../context/AuthContext";

const AppLayout = (props: any) => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <h1> {auth.role} </h1>
      {props.children}
    </div>
  );
};

export default AppLayout;
