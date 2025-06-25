import './about-us.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>Sobre Nuestra Tienda</h1>
        <p>
          Bienvenidos a <strong>Golden Figures Collection</strong>, un espacio dedicado a todos los apasionados de las figuras de colección.
        </p>
        <p>
          Desde 2022, ofrecemos una cuidada selección de figuras de edición limitada, anime, superhéroes, cine, videojuegos y mucho más.
        </p>
        <p>
          Nuestro compromiso es brindar productos originales y de alta calidad, en un entorno donde cada fanático pueda encontrar esa pieza que le falta en su colección.
        </p>
        <p>
          Creemos que cada figura cuenta una historia, y estamos aquí para ayudarte a completarla.
        </p>
        <p>
          Gracias por formar parte de nuestra comunidad de coleccionistas.
        </p>
      </div>

      <div className="avatar-container">
        <h1>Acerca del creador</h1>
        <p>
          Esta tienda fue desarrollada por <strong>cindy escobar</strong>, apasionada por la programación y el mundo de las figuras de colección.
        </p>
        <div className="avatar-image-container">
          <img
            className="avatar-image"
            src="data:image/jpeg;base64,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"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
