import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import * as S from "./styles";

const AdminLayout = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  return (
    <S.MainContainer>
      <S.MainContent >
        <Outlet />
      </S.MainContent>
    </S.MainContainer>
  );
};

export default AdminLayout;
