import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import AllBatches from "./pages/all-batches";
import Login from "./pages/login";

function App() {
  const isUserLoggedIn = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isUserLoggedIn ? (
            <Navigate to="/admin/batch" />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      />
      <Route path="/admin">
        <Route path="login" element={<Login />} />
        <Route
          path="batch"
          element={
            isUserLoggedIn ? <AllBatches /> : <Navigate to="/admin/login" />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
