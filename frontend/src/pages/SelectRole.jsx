import { useNavigate } from "react-router-dom";

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-80 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Select Your Role
      </h1>

      <button
        className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-4 hover:bg-indigo-700 transition"
        onClick={() => navigate("/auth?role=ROLE_ADMIN")}
      >
        Admin
      </button>

      <button
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        onClick={() => navigate("/auth?role=ROLE_EMPLOYEE")}
      >
        Employee
      </button>
    </div>
  );
}

export default SelectRole;
