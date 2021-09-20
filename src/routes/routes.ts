const Routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // icon: "AppstoreOutlined",
    role: ["ADMIN", "STAFF"],
  },

  {
    path: "/persons",
    name: "Persons",
    // icon: "FileSearchOutlined",
    role: ["ADMIN"],
  },
  {
    path: "/queues",
    name: "Queues",
    // icon: "FileSearchOutlined",
    role: ["ADMIN"],
  },
  {
    path: "/staffs",
    name: "Staffs",
    // icon: "FileSearchOutlined",
    role: ["ADMIN"],
  },
  {
    path: "/counter",
    name: "Counter",
    // icon: "FileSearchOutlined",
    role: ["STAFF"],
  },
  {
    path: "/transcation",
    name: "Transcation",
    // icon: "FileSearchOutlined",
    role: ["STAFF"],
  },
];

export default Routes;
