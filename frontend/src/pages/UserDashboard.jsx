const products = [
  { id: 1, name: "Laptop", price: "₹60,000" },
  { id: 2, name: "Mobile Phone", price: "₹25,000" },
  { id: 3, name: "Headphones", price: "₹3,000" },
];

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        User Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold text-green-600">
          ✅ User logged in successfully
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-gray-600">{p.price}</p>

            <button className="mt-3 bg-purple-600 text-white px-3 py-1 rounded">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
