import React, { useEffect, useState } from "react";
import CustomRoutes from "./router/custom-route";
import { useAppDispatch } from "./store/hooks";
import { toast } from "./helpers/functions/swal";


const App = () => {

  return (
    <div>
      <CustomRoutes/>
    </div>
  )
};

export default App;
