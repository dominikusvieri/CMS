import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
};

export default RootLayout;
