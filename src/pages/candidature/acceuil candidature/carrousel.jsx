import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image1 from './carrouselimg1.jpg';
import Image2 from './carrouselimg2.jpg';
import Image3 from './carrouselimg3.jpeg';

const CarouselComponent = () => {
  return (
    <div style={{width:"90%", height:"55%", marginLeft:"5%"}} id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={Image1} alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Installation moderne</h5>
            <p>Des équipements à la pointe de la technologie pour une expérience d'apprentissage optimale.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Image2} alt="Second slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Environnement de travail</h5>
            <p>Un environnement de travail stimulant et inspirant pour nos stagiaires.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Image3} alt="Third slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Événements et séminaires</h5>
            <p>Participer à des événements et séminaires enrichissants au sein de notre institut.</p>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <style>
        {`
          .carousel-item {
            transition: transform 0.6s ease-in-out;
          }
          .carousel-item.active,
          .carousel-item-next,
          .carousel-item-prev {
            display: block;
          }
          .carousel-item-next,
          .carousel-item-prev {
            position: absolute;
            top: 0;
          }
          .carousel-item-next.carousel-item-left,
          .carousel-item-prev.carousel-item-right {
            transform: translateX(0);
          }
          .carousel-item-next,
          .carousel-item.active.carousel-item-right {
            transform: translateX(100%);
          }
          .carousel-item-prev,
          .carousel-item.active.carousel-item-left {
            transform: translateX(-100%);
          }
        `}
      </style>
    </div>
  );
};

export default CarouselComponent;