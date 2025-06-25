import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar as faStarSolid,
  faChevronRight,
  faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "./ProductCard.css";
import { formatPrice } from "../../services/utils/formatNumber";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductCard({ product }) {
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  const { addOrderItem } = useOrder();

  if (!product) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "Fecha desconocida";

    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(product?.createdAt);

  return (
    <article className="card">
      <div className="card-header">
        <img
          className="card-img"
          src={`${imagesURL}/${product?.image}`}
          alt={product?.name}
        />
        <div className="actions">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>

      <div className="card-main">
        <div className="card-category">{product?.category?.name}</div>
        <h3 className="card-title">{product?.name}</h3>
        <div className="card-average">
          <FontAwesomeIcon icon={faStarSolid} />
          <FontAwesomeIcon icon={faStarSolid} />
          <FontAwesomeIcon icon={faStarSolid} />
          <FontAwesomeIcon icon={faStarRegular} />
          <FontAwesomeIcon icon={faStarRegular} />
          (3)
        </div>

        <div className="card-price">
          <span className="product-discount-price">
            <small>$</small> {formatPrice(product?.price * 0.9)}
          </span>
          <span className="normal-price">
            <small>$</small> {formatPrice(product?.price)}
          </span>
        </div>

        <p className="selection-ingreso">
          <strong>Fecha de ingreso: {formattedDate}</strong>
        </p>
      </div>

      <div className="card-footer">
        <button
  onClick={() => {
    addOrderItem(product);
    Swal.fire({
      title: "Producto agregado",
      text: `${product.name} Se ha añadido al carrito`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }}
  className="add-to-cart"
>
  Añadir al carrito
</button>


        <Link
          className="view-more-icon"
          to={`/product-detail/${product?._id}`}
          title="Ver detalle"
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Link>
      </div>
    </article>
  );
}
