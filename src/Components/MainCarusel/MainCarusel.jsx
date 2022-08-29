import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import "./MainCarusel.css";

export default function MainCarusel(props) {
  const { info, responsive, addToCart } = props;

  return (
    <AliceCarousel mouseTracking autoPlay autoPlayInterval="3000" responsive={responsive}>
        {info?.map((item, index) => {
            return <div key={index} className="carusel-item">
              <img className="carusel-item-img" src={item?.image}/>
              <p className="carusel-title">{item?.title}</p>
              <p className="carusel-price">${item?.price}</p>
              <div className="main-add-to-cart" onClick={()=>{addToCart(item, index)}}>Add to cart</div>
            </div>
        })}
   </AliceCarousel>
  )
}
