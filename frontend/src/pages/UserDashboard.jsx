import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../Services/productService";
import authService from "../Services/AuthService";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await productService.searchProducts(searchTerm);
        setProducts(response.data);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      loadProducts();
    }
  };

  const user = authService.getCurrentUser();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>User Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.userName}>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchBtn}>
          Search
        </button>
        <button onClick={loadProducts} style={styles.clearBtn}>
          Clear
        </button>
      </div>

      <div style={styles.info}>
        <p>📋 Total Products: {products.length}</p>
        <p>👀 You have view-only access</p>
      </div>

      <div style={styles.productsGrid}>
        {products.length === 0 ? (
          <p style={styles.noProducts}>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div style={styles.productHeader}>
                <h3>{product.name}</h3>
                <span
                  style={
                    product.quantity > product.minStockLevel
                      ? styles.stockHigh
                      : product.quantity > 0
                        ? styles.stockLow
                        : styles.stockOut
                  }
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <p style={styles.description}>{product.description}</p>

              <div style={styles.productDetails}>
                <div style={styles.detailRow}>
                  <span style={styles.label}>Category:</span>
                  <span>{product.category}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.label}>Supplier:</span>
                  <span>{product.supplier}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.label}>Quantity:</span>
                  <span style={styles.quantityBadge}>{product.quantity}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.label}>Price:</span>
                  <span style={styles.price}>₹{product.price}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.label}>Added By:</span>
                  <span>Admin</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "24px",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    background: "white",
    padding: "20px 28px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  headerRight: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  userName: {
    fontWeight: "600",
    color: "#444",
    fontSize: "1rem",
  },

  logoutBtn: {
    padding: "10px 22px",
    background: "linear-gradient(135deg, #ff4b2b, #ff416c)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s",
  },

  searchContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "22px",
  },

  searchInput: {
    flex: 1,
    padding: "14px 18px",
    border: "2px solid #dbe3f0",
    borderRadius: "30px",
    fontSize: "1rem",
    outline: "none",
  },

  searchBtn: {
    padding: "14px 26px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "600",
  },

  clearBtn: {
    padding: "14px 26px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "600",
  },

  info: {
    background: "white",
    padding: "18px 24px",
    borderRadius: "12px",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    fontWeight: "600",
    color: "#555",
  },

  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },

  noProducts: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "40px",
    color: "#888",
    fontSize: "1.2rem",
  },

  productCard: {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "14px",
  },

  stockHigh: {
    background: "#e6f7ed",
    color: "#1e7e34",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
  },

  stockLow: {
    background: "#fff3cd",
    color: "#856404",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
  },

  stockOut: {
    background: "#fdecea",
    color: "#b21f2d",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "700",
  },

  description: {
    color: "#666",
    marginBottom: "18px",
    lineHeight: "1.6",
  },

  productDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px dashed #eaeaea",
    fontSize: "0.95rem",
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },

  quantityBadge: {
    background: "#e7f3ff",
    color: "#0056b3",
    padding: "5px 14px",
    borderRadius: "20px",
    fontWeight: "700",
  },

  price: {
    fontSize: "1.4rem",
    fontWeight: "800",
    color: "#28a745",
  },
};


export default UserDashboard;
