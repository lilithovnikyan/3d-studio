import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import AddProduct from "./Components/AddProduct/AddProduct";
import MainCarusel from "./Components/MainCarusel/MainCarusel";
import SecondCarusel from "./Components/SecondCarusel/SecondCarusel";
import LeftSidebar from "./Components/LeftSidebar/LeftSidebar";
import cart from "./shopping-cart.png";


function App() {

  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [info, setInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [secondSlide, setSecondSlide] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openSidebarFixed, setOpenSidebarFixed] = useState(false);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(res => {
      setInfo(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then(res => {
      setCategories(res.data);
    });
  }, []);


  const filterProducts = (item) => {
    axios.get(`https://fakestoreapi.com//products/category/${item}`).then(res => {
      setInfo(res.data);
    });
  }

  const openModalProduct = () => {
    setOpenModal(!openModal);
    setNewProduct('');
    setNewPrice('');
  }

  const addToCart = (item) => {
    setOpenSidebar(true);
    setOpenSidebarFixed(true);

    let index = cartItems.findIndex(o => o.id == item.id);
    if (index < 0) {
      item.count = 1;
      cartItems.push(item);
      setCartItems(cartItems);
    } else {
      item.count++;
    }
  }

const incrementCount = (item) => {
  let index = cartItems.findIndex(o => o.id == item.id);
  let newArray = [...cartItems];
  newArray[index].count++;
  setCartItems(newArray);
}

const decrementCount = (item) => {
  if(item.count > 0) {
    let index = cartItems.findIndex(o => o.id == item.id);
    let newArray = [...cartItems];
    newArray[index].count--;
    setCartItems(newArray);
  }
}

  const openLeftCart = () => {
    setOpenSidebar(true);
    setOpenSidebarFixed(true);
  }

  const addProduct = (item, price, images, count) => {
    if (item && price && images.length > 0) {
      const newObject = {
        title: item,
        price: price,
        image: images[0].data_url,
        count: count,
        id: Math.floor(Math.random() * 100000000)
      }
      secondSlide.push(newObject);
    }

    localStorage.setItem("productStorage", JSON.stringify(secondSlide));
    const user = JSON.parse(localStorage.getItem("productStorage"));
    console.log(user);
  }

  const handleChange = (e) => {
    setNewProduct(e.target.value);
  }

  const deleteElement = (id) => {
    let index = secondSlide.findIndex(o => o.id == id);
    const newSecondSlide = [...secondSlide];
    newSecondSlide.splice(index, 1);
    setSecondSlide(newSecondSlide);
 }

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  }

  const openLeftSidebar = () => {
    setOpenSidebar(false);
    setOpenSidebarFixed(false);
  }

  const removeElemInCart = (id) => {
    let index = cartItems.findIndex(o => o.id == id);
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    deleteElement(id);
  }

  return (
    <div className="">
      <div className="carusel main-carusel">
        <div className="menu">
          <div className="categories">
            {categories?.map((item, index) => {
              return <span key={index} onClick={() => filterProducts(item)}>{item}</span>
            })}
          </div>
          <div className="shopping-cart-block" onClick={() => { openLeftCart() }}>
            <img className="shopping-cart-logo" src={cart} />
          </div>
          <div className="add" onClick={openModalProduct}><a>Add product</a></div>
        </div>
        <MainCarusel info={info} responsive={responsive} addToCart={addToCart} />
      </div>
      <SecondCarusel
        secondSlide={secondSlide}
        responsive={responsive}
        deleteElement={deleteElement}
        addToCart={addToCart}
      />
      <AddProduct
        openModal={openModal}
        openModalProduct={openModalProduct}
        newProduct={newProduct}
        newPrice={newPrice}
        addProduct={addProduct}
        handleChange={handleChange}
        handlePriceChange={handlePriceChange}
      />
      <LeftSidebar
        addToCart={addToCart}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        openSidebar={openSidebar}
        cartItems={cartItems}
        openLeftSidebar={openLeftSidebar}
        removeElemInCart={removeElemInCart}
      />
      <div className={`close-sidebar ${openSidebarFixed ? "open-sidebar" : ""}`}></div>
    </div>
  );
}

export default App;

