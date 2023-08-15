import React from "react";
import HomePage from "./pages/user/home-page";
import CustomRoutes from "./router/custom-route";

const App = () => {

  return (
    <div style={{ backgroundColor: "rgb(237, 237, 237)" }}>
      <CustomRoutes/>
    </div>
  )
};

export default App;
