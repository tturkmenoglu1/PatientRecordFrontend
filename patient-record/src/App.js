import React, { useEffect, useState } from "react";
import CustomRoutes from "./router/custom-route";
import { useAppDispatch } from "./store/hooks";
import { toast } from "./helpers/functions/swal";


const App = () => {

  return (
    <div style={{ backgroundColor: "rgb(0, 0, 0)" }}>
      <CustomRoutes/>
    </div>
  )
};

export default App;
