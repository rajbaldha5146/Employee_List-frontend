import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage"; // Import the new page

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addemployee" element={<CreateEmployeePage />} />
        <Route path="/updateemployee/:id" element={<UpdateEmployeePage />} /> {/* New route */}
      </Routes>
    </div>
  );
}

export default App;