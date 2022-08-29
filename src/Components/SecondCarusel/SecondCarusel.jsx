import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

export default function SecondCarusel(props) {
    const { responsive, secondSlide, deleteElement, addToCart } = props;
  return (
    <div className="zindex">
    <div className="carusel">
      <AliceCarousel mouseTracking autoPlay autoPlayInterval="3000" responsive={responsive}>
        {secondSlide?.map((item, index) => {
            return <div key={index} className="carusel-item">
                <div onClick={(e)=>{deleteElement(item.id)}} className="close-item">&#x2715;</div>
                <img className="carusel-item-img" src={item?.image}/>
                <p>{item.title}</p>
                <p className="carusel-price">${item.price}</p>
                <div className="add-to-cart" onClick={()=>{addToCart(item)}}>Add to cart</div>
            </div>
        })}
      </AliceCarousel>
    </div>
  </div>
  )
}




