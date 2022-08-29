import React from 'react';
import "./LeftSidebar.css";

export default function LeftSidebar(props) {
    const { openSidebar, openLeftSidebar, cartItems, removeElemInCart, incrementCount, decrementCount } = props;

    return (
        <div className={`left-sidebar ${openSidebar ? "modalSidebarOpen" : ""}`}>
            <div className="left-header">
                <h3>Զամբյուղ</h3>
                <div className="close-item" onClick={()=>{openLeftSidebar()}}>✕</div>
            </div>
            <div className="left-content">
                {cartItems?.map((item, index) => {
                    return <div key={index} className="carusel-item add-to-cart-item">
                        <div className="left-slide-img-block">
                            <img src={item?.image}/>
                        </div>
                        <div className="left-carusel-item">
                            <p className="carusel-add-title">{item?.title}</p>
                            <div className="minu-puls-block">
                                <div className="minus-plus">
                                    <span className="minus" onClick={()=>decrementCount(item)}>-</span>
                                    <span className="count">{item?.count}</span>
                                    <span className="plus" onClick={()=>incrementCount(item)}>+</span>
                                </div>
                                <p className="carusel-price">${item?.price}</p>
                            </div>
                        </div>
                        <div className="remove-elem-left-slide" onClick={()=>removeElemInCart(item.id)}>
                            ✕
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
