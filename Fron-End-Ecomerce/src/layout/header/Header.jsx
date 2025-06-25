import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";

export default function Header() {
    const { user, logout } = useUser();
    const { toggleSidebarOrder, count } = useOrder();

    return (
        <header className="main-header">
            <div className="header-container">
                <NavLink to="/" className="header-logo">
                    Figu<span>Colección</span>
                </NavLink>

                <nav className="header-nav">
                    <NavLink to="/" className="nav-link">Inicio</NavLink>
                    <NavLink to="/about-us" className="nav-link">Acerca</NavLink>
                    <NavLink to="/contact" className="nav-link">Contacto</NavLink>
                    <NavLink to="/register" className="nav-link">Registro</NavLink>
                    
                    {user && user.role === "ADMIN_ROLE" && (
                        <>
                            <NavLink to="/admin-product" className="nav-link">Admin Productos</NavLink>
                            <NavLink to="/admin-user" className="nav-link">Admin Usuarios</NavLink>
                        </>
                    )}
                </nav>

                <div className="header-actions">
                    {user ? (
                        <>
                            <button className="nav-link logout-button" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="nav-link">
                            <FontAwesomeIcon icon={faUserCircle} /> Login
                        </NavLink>
                    )}

                    <div className={`cart-icon ${count > 0 ? 'show-badge' : ''}`} data-count={count}>
                        <FontAwesomeIcon icon={faCartShopping} onClick={toggleSidebarOrder} />
                    </div>
                </div>
            </div>
        </header>
    );
}
