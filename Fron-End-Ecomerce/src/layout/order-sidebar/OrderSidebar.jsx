import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import { faTrashCan, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./OrderSidebar.css";
import axios from "axios";

export default function OrderSidebar() {
  const {
    order,
    total,
    handleChangeQuantity,
    removeItem,
    sidebarToggle,
    toggleSidebarOrder,
  } = useOrder();

  const token = localStorage.getItem("token");

  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        { products: order, total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Orden creada:", response.data);

      const allOrdersResponse = await axios.get(
        "http://localhost:3000/api/orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Todas las órdenes:", allOrdersResponse.data);

      console.log("Orden actual enviada:", { products: order, total });
    } catch (error) {
      console.error(
        "Error al procesar la orden:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className={`order-wrapper ${sidebarToggle ? "active" : ""}`}>
      <div className="order-close" onClick={toggleSidebarOrder}>
        <FontAwesomeIcon icon={faTimes} title="Cerrar" />
      </div>
      <div className="list-container">
        <h2>Orden actual:</h2>
        <ul className="order-list">
          {Array.isArray(order) && order.length > 0 ? (
            order.map((product) => (
              <li className="order-item" key={product._id ?? `${product.name}-${product.price}`}>
                <img
                  className="order-image"
                  src={
                    product.image
                      ? `http://localhost:3000/images/products/${product.image}`
                      : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                  }
                  alt={product.name}
                />

                <div className="order-item-name" title={product.name}>
                  {product.name}
                </div>

                <div className="order-quantity">
                  <input
                    type="number"
                    className="order-quantity-input"
                    value={product.quantity}
                    onChange={(evt) =>
                      handleChangeQuantity(product._id, Number(evt.target.value))
                    }
                    min={1}
                  />
                </div>
                <div className="order-price">${product.price}</div>
                <div className="order-price">
                  $ {product.price * product.quantity}
                </div>
                <div className="order-actions">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    title="Eliminar producto"
                    onClick={() => removeItem(product._id)}
                  />
                </div>
              </li>
            ))
          ) : (
            <li key="empty">No hay productos en la orden</li>
          )}
        </ul>
      </div>

      <div className="order-finish">
        <div className="total">
          <div className="total-count">
            Items:{" "}
            {Array.isArray(order)
              ? order.reduce((acc, prod) => acc + prod.quantity, 0)
              : 0}
          </div>
          <div className="total-price">
            Total $ <span>{total}</span>
          </div>
        </div>
        <div className="order-purchase">
          <button className="btn" onClick={handlePurchase}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
