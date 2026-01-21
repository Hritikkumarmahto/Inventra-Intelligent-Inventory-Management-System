import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../Services/productService";
import authService from "../Services/AuthService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    supplier: "",
    quantity: 0,
    price: 0,
    minStockLevel: 5,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
      } else {
        await productService.createProduct(formData);
      }
      loadProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleStockIn = async (id) => {
    await productService.stockIn(id, 5);
    loadProducts();
  };

  const handleStockOut = async (id) => {
    await productService.stockOut(id, 5);
    loadProducts();
  };

  const resetForm = () => {
    setFormData({
      sku: "",
      name: "",
      description: "",
      category: "",
      supplier: "",
      quantity: 0,
      price: 0,
      minStockLevel: 5,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const user = authService.getCurrentUser();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Admin Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.userName}>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
        {showForm ? "Cancel" : "+ Add Product"}
      </button>

      {showForm && (
        <div style={styles.formCard}>
          <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit} style={styles.form}>

            <input
              type="text"
              placeholder="SKU"
              value={formData.sku}
              onChange={(e) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              required
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={styles.input}
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={styles.textarea}
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              style={styles.input}
            />

            <input
              type="text"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={(e) =>
                setFormData({ ...formData, supplier: e.target.value })
              }
              required
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value),
                })
              }
              required
              style={styles.input}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Unit Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value),
                })
              }
              required
              style={styles.input}
            />

            <input
              type="number"
              placeholder="Minimum Stock Level"
              value={formData.minStockLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  minStockLevel: parseInt(e.target.value),
                })
              }
              required
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>
              {editingProduct ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            {product.quantity <= product.minStockLevel && (
              <div style={styles.lowStockBadge}>⚠ Low Stock</div>
            )}

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div style={styles.productInfo}>
              <span>SKU: {product.sku}</span>
              <span>Category: {product.category}</span>
              <span>Supplier: {product.supplier}</span>
              <span>Qty: {product.quantity}</span>
              <span>Price: ₹{product.price}</span>
            </div>

            <div style={styles.actions}>
              <button
                onClick={() => handleEdit(product)}
                style={styles.editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>

              <button
                onClick={() => handleStockIn(product.id)}
                style={styles.stockBtn}
              >
                + Stock
              </button>

              <button
                onClick={() => handleStockOut(product.id)}
                style={styles.stockOutBtn}
              >
                - Stock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "1400px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  headerRight: { display: "flex", gap: "15px", alignItems: "center" },
  userName: { fontWeight: "600", color: "#555" },
  logoutBtn: { padding: "8px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  addBtn: { padding: "12px 25px", background: "#667eea", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", marginBottom: "20px" },
  formCard: { background: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" },
  input: { padding: "12px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem" },
  textarea: { padding: "12px", border: "2px solid #e0e0e0", borderRadius: "6px", fontSize: "1rem", minHeight: "100px", resize: "vertical" },
  submitBtn: { padding: "12px", background: "#28a745", color: "white", border: "none", borderRadius: "6px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer" },
  productsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" },
  productCard: { background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  productInfo: { display: "flex", flexDirection: "column", gap: "8px", margin: "15px 0", color: "#666", fontSize: "0.9rem" },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  editBtn: { flex: 1, padding: "8px", background: "#ffc107", border: "none", borderRadius: "5px", cursor: "pointer" },
  deleteBtn: { flex: 1, padding: "8px", background: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  stockBtn: { flex: 1, padding: "8px", background: "#17a2b8", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  stockOutBtn: { flex: 1, padding: "8px", background: "#6f42c1", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  lowStockBadge: { background: "#ffcccc", color: "#b30000", padding: "6px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "10px" },
};

export default AdminDashboard;
