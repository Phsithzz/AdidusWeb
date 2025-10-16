
import Cart from '../pages/Cart'
import Navbar from '../components/Navbar'
import SlideProduct from '../components/SlideProduct'
const LayoutCart = () => {
  
  return (
    <>
    
    <div className="flex flex-col space-y-4">
        <Navbar/>
        <Cart />
        <SlideProduct />
    </div>
    </>
  )
}

export default LayoutCart