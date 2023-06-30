import { useEffect, createContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ROUTES } from "constants/routes";

// Layout
import AdminLayout from "layouts/admin/AdminLayout";

// Page
import DashboardPage from "pages/admin/DashboardPage";
import OrderPage from "pages/admin/OrderPage";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ADMIN.ORDERS} element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
