import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectRole from "./pages/SelectRole";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectRole />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
