function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold text-green-600">
          ✅ Admin logged in successfully
        </h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Add Item </h3>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Item Name"
        />

        <input className="w-full border p-2 rounded mb-3" placeholder="Price" />

        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Description"
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
