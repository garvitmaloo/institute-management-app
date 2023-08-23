import { Routes, Route } from "react-router-dom";
import AllBatches from "./pages/all-batches";

function App() {
  return (
    <Routes>
      <Route path="/admin">
        <Route path="batch" element={<AllBatches />} />
      </Route>
    </Routes>
  );
}

export default App;
