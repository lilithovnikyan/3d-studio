import React, {useState} from 'react';
import "./AddProduct.css";
import ImageUploading from 'react-images-uploading';

export default function AddProduct(props) {
    const{openModal, addProduct, openModalProduct, newProduct, handleChange, newPrice, handlePriceChange} = props;
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const closeModal = () => {
        openModalProduct();
    }
    const saveProduct = (item, price, images, count) => {
        if(item && price && images.length > 0) {
            addProduct(item, price, images, count);
            openModalProduct();
            setImages("");
        }
    }

  return (
    <div className={`add-product ${openModal ? "modalOpen" : ""}`}>
        <div className='add-product-content'>
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
            <div className="upload__image-wrapper">
                <div className='upload__image_content'>
                    <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload}{...dragProps} >
                        Click or Drop here
                    </button>
                    &nbsp;
                </div>
                {imageList.map((image, index) => (
                <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="upload__image_content">
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </ImageUploading>
            <div className='product-block'>
                <label className='product-title'>Product Name</label>
                <input type="text" value={newProduct} onChange={handleChange}/>
            </div>
            <div className='product-block'>
                <label className='product-title'>Product Price</label>
                <input type="number" value={newPrice} onChange={handlePriceChange}/>
            </div>
            <button className='save' onClick={()=> saveProduct(newProduct, newPrice, images, 0)}>Add product</button>
            <span className='close' onClick={() => closeModal()}>&#x2715;</span>
        </div>
    </div>
  )
}




