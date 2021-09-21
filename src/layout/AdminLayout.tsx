import AdminSideBar from "../components/layout/AdminSideBar";

const AdminLayout = (props: any) => {
  return <AdminSideBar>{props.children}</AdminSideBar>;
};

export default AdminLayout;
