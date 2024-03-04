import { useState } from 'react'
import { Data } from './Data'
// import './App.css'
import logo from './images/logo.svg';



function App() {
  const [products]  = useState(Data);
  const [Amount,setAmount] = useState(1)
  const [slideIndex,setSlideIndex] = useState(0)
  const [preSlideIndex,setPreSlideIndex] = useState(0)
  const [prevVisible,setPrevVisible] = useState(false);
  const [cartVisible,toggleCartVisble] = useState(false);

  const [cart,setCart] = useState([]);
  const [mobileMenuVis,setMMV] = useState(false)


  console.log(cart)

  const addToCart = () =>{

    const cartProduct = {
      productId : products[slideIndex].id,
      productName: products[slideIndex].productName,
      thumbnail: products[slideIndex].thumbnail,
      price: products[slideIndex].price*Amount,
      quantity: Amount,
    } 
    if(cart.filter((item)=>item.productId ==cartProduct.productId).length == 0){
      //cart does not have a cartitem with productId
      // add new cart item to the array called Cart
      setCart([...cart,cartProduct])
    }
    else{
      // update exisiting product
     setCart([
      ...cart.filter((item)=>item.productId !=cartProduct.productId),
      cartProduct
     ])
    }
  }
  const handleMinus = () =>{
    setAmount(Amount - 1)
    if(Amount<=1){setAmount(1)}
  }
  const handleIncrement = () => {
    setAmount(Amount + 1)
  }
  const previousSlide = () =>{
    if(slideIndex !== 0){
      setSlideIndex(slideIndex-1)
    }else if(slideIndex === 0){
      setSlideIndex(products.length-1)
    }
  }

  const nextSlide = () =>{
    if(slideIndex !== (products.length-1)){
      setSlideIndex(slideIndex + 1)
    }else if(slideIndex === (products.length-1)){
      setSlideIndex(0)
    }
  }
  const previewpreviousSlide = () =>{
    if(preSlideIndex !== 0){
      setPreSlideIndex(preSlideIndex-1)
    }else if(preSlideIndex === 0){
      setPreSlideIndex(products.length-1)
    }
  }

  const previewnextSlide = () =>{
    if(preSlideIndex !== (products.length-1)){
      setPreSlideIndex(preSlideIndex + 1)
    }else if(preSlideIndex === (products.length-1)){
      setPreSlideIndex(0)
    }
  }
  
  const activePreview = () =>{
    setPrevVisible(true)
    setPreSlideIndex(slideIndex)
  }
  const handleDelete = (id) =>{
    const _newCart = cart.filter(item => item.productId !== id);
    setCart(_newCart)
  }

  function Header(){
    return(
      <header>
        <div className="header-left">
        <svg className='menuSvg' onClick={()=>setMMV(true)} width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fill-rule="evenodd"/></svg>
          <img src={logo} alt="" />
          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="header-right">
          <div className="cart-notification">
            {cart.length > 0 && <div className="cartPopNotice"><span>{cart.length}</span></div>}
            <svg width="22" onClick={() => toggleCartVisble(!cartVisible)} height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fill-rule="nonzero"/></svg>
          </div>
          <img src="./images/image-avatar.png" alt="avatar image"/>
        </div>
    
      </header>
    )
  }

  return (
    <>
      <Header/>

      <main>
        <div className="main-left">
          <div className="main-left-main">
            <img onClick={activePreview} src={products[slideIndex].mainImage} alt="" />
          </div>
          <div className="main-left-footer">          
            {products.map((item,index)=>(
                  <img  key={item.id} onClick={()=>setSlideIndex(index)} className={index === slideIndex && "highlight"}  src={item.thumbnail} alt="" />
              ))}
          </div>
          <div className="Nav">
              <div onClick={previousSlide} className="previousDiv cursorPointer"><svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></div>
              <div onClick={nextSlide} className="nextDiv cursorPointer"><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></div>
          </div>
        </div>

      <div className="main-right">
      <h6>Sneaker Company</h6>
      <h1>{products[slideIndex].productName}<br/> Sneakers</h1>
      <p> These low-profile sneakers are your perfect casual wear companion. Featuring a 
        durable rubber outer sole, they’ll withstand everything the weather can offer.</p>

      <div className="prices">
        <div className="price-discount">
          <h3>${(products[slideIndex].price)*(50/100)}.00</h3>
          <h4>50%</h4>
        </div>
        <h6>{products[slideIndex].price}.00</h6>
      </div>

      <div className="add-to-cart">
        <div className="quantity">
        <h1 onClick={handleMinus} className='adder'>-</h1>
          <h5>{Amount}</h5>
        <h1 onClick={handleIncrement} className='adder'>+</h1>
        </div>
        
        <button onClick={addToCart} className='cursorPointer' >
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentcolor" fill-rule="nonzero"/></svg>
          Add to cart
        </button>
      </div>
    </div>
  </main>

  <div className={prevVisible ? "dimmer" : "dimmer hidden"}></div>


  
  <div className={prevVisible ? "previewDiv": "previewDiv hidden"}>
    <div onClick={()=>setPrevVisible(false)} className="cancelSvg cursorPointer">
      <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="currentcolor" fill-rule="evenodd"/></svg>
    </div>
    <div className="previewDivMain"><img src={products[preSlideIndex].mainImage} alt=""/></div>
    <div className="previewDivFooter">
    {products.map((item,index)=>(
                  <img  key={item.id} onClick={()=>setPreSlideIndex(index)} className={index === preSlideIndex && "highlight"}  src={item.thumbnail} alt="" />
              ))}

    </div>

    <div className="previewNav">
      <div onClick={previewpreviousSlide} className="previousDiv cursorPointer"><svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></div>
      <div onClick={previewnextSlide} className="nextDiv cursorPointer"><svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg></div>
    </div>
  </div>

  

      <div className={ cartVisible ? "cart": "cart hidden"}>
        <h2>Cart</h2>
        <hr />
        {cart.length>0 ? 
        <div className="products">

          {cart.map(item=>(
              <div className="product" key={item.productId}>
             <img src={item.thumbnail} alt="" />
             <div className="product_details">
               <p>{item.productName} Sneakers</p>
               <p>{item.price * (50/100)} x {Amount} <span>{item.price}.00</span></p>
             </div>
             <div className="deleteIcon" onClick={()=>handleDelete(item.productId)}><img src="./images/icons8-delete-24.png" alt="" /></div>
           </div>
             ))}
          </div> 
          : <h2>cart is empty</h2>
      }
        <button onClick={()=>setCart([])}>Checkout</button>
      </div> 



      <div className={mobileMenuVis ? "mobileMenu" : "mobileMenu hidden"}>
        <div className="innerMenu">
        <svg width="14" height="15" onClick={()=>setMMV(false)} xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>

          <ul>
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
