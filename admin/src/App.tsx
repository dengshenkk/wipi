import * as React from "react";
import { UserLayout } from "./layouts/UserLayout";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <UserLayout>
        <Login />
      </UserLayout>
    </>
  );
}

export default App;
