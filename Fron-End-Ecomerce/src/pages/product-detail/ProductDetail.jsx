import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../../services/utils/formatNumber";
import { useOrder } from "../../context/OrderContext";
import "./ProductDetail.css";

const URL = `http://localhost:3000/api/products`;

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { addOrderItem } = useOrder();

  async function getProductById(productId) {
    try {
      const response = await axios.get(`${URL}/${productId}`);
      console.log('Datos del producto:', response.data);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  if (loading) {
    return <h4 style={{ textAlign: "center", color: "#fff" }}>Cargando....</h4>;
  }

  if (!product) {
    return <h4 style={{ textAlign: "center", color: "#fff" }}>Producto no encontrado</h4>;
  }

  return (
    <div className="product-detail-card">
      <div className="product-detail-header">
        <img
          className="product-detail-img"
          src={`http://localhost:3000/images/products/${product.image}`}
          alt={product.name || 'Imagen no disponible'}
        />
      </div>
      <div className="product-detail-body">
        <h2 className="product-detail-title">{product.name || 'Nombre no disponible'}</h2>
        <p className="product-detail-description">
          {product.description || 'Descripción no disponible'}
        </p>
        <p className="product-detail-price">
          $ {formatPrice(product.price) || 'Precio no disponible'}
        </p>
        <p className="product-detail-brand">
          Marca: Coleccionable
        </p>
        <p className="product-detail-info">
          Estas figuras coleccionables son piezas únicas de edición limitada, ideales para fanáticos y coleccionistas. Calidad premium y detalles de alta precisión. ¡No te quedes sin la tuya!
        </p>
      </div>
      <div className="product-detail-footer">
        <button 
          onClick={() => addOrderItem(product)} 
          className="add-to-cart-button"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
