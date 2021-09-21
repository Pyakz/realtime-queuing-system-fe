import { FiSettings, FiBell, FiUsers } from "react-icons/fi";

import { MdDashboard, MdFormatListBulleted, MdPeople } from "react-icons/md";

const Routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdDashboard,
    role: ["ADMIN", "STAFF"],
  },

  {
    path: "/persons",
    name: "Persons",
    icon: FiUsers,
    role: ["ADMIN"],
  },
  {
    path: "/queues",
    name: "Queues",
    icon: MdFormatListBulleted,
    role: ["ADMIN"],
  },
  {
    path: "/staffs",
    name: "Staffs",
    icon: MdPeople,
    role: ["ADMIN"],
  },
  {
    path: "/counter",
    name: "Counter",
    icon: FiSettings,
    role: ["STAFF"],
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: FiBell,
    role: ["STAFF"],
  },
];

export default Routes;
