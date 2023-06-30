import { ROUTES } from "../../../constants/routes";
// import { HomeOutlined, CodeSandboxOutlined, UserOutlined, SwapOutlined, ProfileOutlined } from "@ant-design/icons";

export const SIDEBAR_ITEMS = [
  {
    title: "Tổng quan",
    path: ROUTES.ADMIN.DASHBOARD,
    icon: <i className="fa-solid fa-house icon"></i>,
  },
  {
    title: "Danh sách đơn hàng",
    path: ROUTES.ADMIN.ORDERS,
    icon: <i className="fa-solid fa-book icon"></i>,
  },
];
