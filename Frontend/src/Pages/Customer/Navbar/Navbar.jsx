import { 
  Avatar, Button, Card, CardBody, Dialog, DialogBody, DialogHeader, Drawer, 
  IconButton, Menu, MenuHandler, MenuItem, MenuList, Radio, Tooltip, Typography 
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../../Components/Hook/useToken';
import { GiShoppingCart } from 'react-icons/gi';
import Map from '../MapCard/SingleMap';
import toast from "react-hot-toast";
import OrderButton from './Btton';

export default function Navbar() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [openX, setOpenX] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [latitudeShared, setLatitudeShared] = useState(null);
  const [longitudeShared, setLongitudeShared] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePaymentMethodChange = (method) => setSelectedMethod(method);

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitudeShared(position.coords.latitude);
          setLongitudeShared(position.coords.longitude);
          toast.success('Location shared!');
        },
        (error) => console.error("Error getting geolocation:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const handleOpenX = () => setOpenX(!openX);

  // Verify token on load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
        return;
      }
      try {
        const response = await axios.post(
          'https://farma-ride-server.vercel.app/api/verifyToken', 
          { token }
        );
        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          removeToken();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
        navigate('/login');
      }
    };
    verifyToken();
  }, [token, navigate, removeToken]);

  // Fetch user info and cart items
  useEffect(() => {
    if (!userID) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/carts/buyer/${userID}`);
        if (response.status === 200) setCartItems(response.data);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchUserInfo();
    fetchCartItems();
  }, [userID]);

  // Update quantity
  const updateQuantity = async (id, quantity, singlePrice) => {
    if (quantity < 1) return;
    const price = quantity * singlePrice;
    try {
      await axios.put(`https://farma-ride-server.vercel.app/api/carts/update/${id}`, { quantity, price });
      setCartItems(prevItems =>
        prevItems.map(item => item._id === id ? { ...item, quantity, price } : item)
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  // Remove single item
  const removeItem = async (id) => {
    try {
      await axios.delete(`https://farma-ride-server.vercel.app/api/carts/delete/${id}`);
      setCartItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // Clear cart after order
  const clearCart = async (buyerId) => {
    try {
      await axios.delete(`https://farma-ride-server.vercel.app/api/carts/${buyerId}`);
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const calculateTotal = () => cartItems.reduce((acc, item) => acc + item.singlePrice * item.quantity, 0).toFixed(2);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const handleOrder = async () => {
    const latitude = latitudeShared ?? userInfo?.latitude;
    const longitude = longitudeShared ?? userInfo?.longitude;

    if (!cartItems.length) return toast.error("Cart is empty!");
    if (!selectedMethod) return toast.error("Select payment method!");

      try {
        const minimum = 100000;
        const maximum = 999999;
        const randomIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const startLat = 23.8103;
      const startLng = 90.4125;
      const endLat = latitude;
      const endLng = longitude;

      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=YOUR_API_KEY&start=${startLng},${startLat}&end=${endLng},${endLat}`
      );

      const data = await res.json();
      const meters =
        data.features[0].properties.segments[0].distance;
      const deliveryCharge = Math.round((meters / 1000) * 10); 
      const response = await axios.post('https://farma-ride-server.vercel.app/api/purchases/buy', {
        buyerId: userID,
        buyerPhone: userInfo?.number,
        otp: randomIndex,
        deliveryCharge,
        products: cartItems.map(item => item.productId),
        productsName: cartItems.map(item => item.medicineName),
        quantity: cartItems.map(item => item.quantity),
        price: cartItems.map(item => item.price),
        latitude,
        longitude,
        buyType: selectedMethod,
      });
      if (response.status === 200) {
        toast.success("Order completed!");
        await clearCart(userID);
        setOpenX(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error processing order!");
    }
  };

  return (
    <div className='bg-white rounded-lg border border-gray-300 shadow-xl mb-2'>
      {/* Navbar Header */}
      <div className="flex justify-between px-10 py-2">
        <div className="flex-1 py-2">
          <a href="/customer">
            <h1 className="font-bold sm:text-lg md:text-xl text-black">FARMA-RIDE</h1>
          </a>
        </div>

        <ul className="flex space-x-6 pt-2 items-center">
          <li>
            <Tooltip content="Search for medicines">
              <Link to="/customer/search" className="text-black hover:underline hover:underline-offset-4">
                <FaSearch className='pr-4 text-4xl' />
              </Link>
            </Tooltip>
          </li>
          <li>
            <Tooltip content="Cart">
              <GiShoppingCart className='pr-3 text-4xl hover:text-[goldenrod]' onClick={openDrawer} />
            </Tooltip>
          </li>
          <li>
            <Menu>
              <MenuHandler>
                <Avatar src={userInfo?.photo} alt="avatar" withBorder color='green' className="p-0.5" />
              </MenuHandler>
              <MenuList>
                <Link to="/customer/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                <Link to="/customer/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
                <MenuItem onClick={handleLogout} className='font-mono'>Logout</MenuItem>
              </MenuList>
            </Menu>
          </li>
        </ul>
      </div>

      {/* Cart Drawer */}
      <Fragment>
        <Drawer placement="right" open={open} onClose={closeDrawer} className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" className="text-[goldenrod]">CART</Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>

          {cartItems.length === 0 ? (
            <Typography color="gray" className="mb-8 pr-4 font-normal">Your cart is empty.</Typography>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item._id} className="mb-4 flex items-center justify-between">
                  <div>
                    <Typography variant="h6">{item.medicineName}</Typography>
                    <Typography color="gray">{item.quantity} x ৳{item.singlePrice.toFixed(2)}</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outlined" onClick={() => updateQuantity(item._id, item.quantity - 1, item.singlePrice)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button size="sm" variant="outlined" onClick={() => updateQuantity(item._id, item.quantity + 1, item.singlePrice)}>+</Button>
                    <IconButton variant="text" color="red" onClick={() => removeItem(item._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </IconButton>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">৳{calculateTotal()}</Typography>
              </div>
              <Button size="sm" className="mt-4 bg-[goldenrod]" fullWidth onClick={handleOpenX}>Checkout</Button>
            </div>
          )}
        </Drawer>
      </Fragment>

      {/* Checkout Dialog */}
      <Dialog open={openX} handler={handleOpenX} className="w-full max-w-md mx-auto p-1 sm:p-2 md:p-3">
        <DialogHeader className="text-[goldenrod] text-center text-lg montserrat-alternates-light">Order Confirmation</DialogHeader>
        <DialogBody className="space-y-2 sm:space-y-3">
          
          {/* Address Section */}
          <div className="border rounded-lg p-2 sm:p-3 bg-white shadow-md">
            <h1 className="text-sm sm:text-md font-bold mb-1">Address:</h1>
            <p className="text-gray-600 mb-1 sm:mb-2 text-xs">Want to use your default address?</p>
            <div className="mb-2 sm:mb-3">
              {userInfo && (userInfo.latitude !== null && userInfo.longitude !== null) && (
                <Map className="w-full h-32 sm:h-48 rounded-lg" latitude={userInfo.latitude} longitude={userInfo.longitude} />
              )}
              <p className="montserrat-alternates-light text-xs">
                If you want to use the default address, no need to select anything <br /> or,
              </p>
            </div>
            <Button onClick={handleLiveLocation} className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-2 rounded w-full sm:w-auto">Live</Button>
          </div>

          {/* Payment Section */}
          <div className="border rounded-lg p-2 sm:p-3 bg-white shadow-md">
            <h1 className="text-md sm:text-lg font-bold mb-1">Payment Method:</h1>
            <div className="flex flex-col space-y-2 sm:space-y-3 mb-2 sm:mb-3">
              <Card className="cursor-pointer" onClick={() => handlePaymentMethodChange('bkash')}>
                <CardBody className={`p-2 sm:p-3 ${selectedMethod === 'bkash' ? 'border-2 border-blue-500' : ''}`}>
                  <Radio name="paymentMethod" label="with Bkash" checked={selectedMethod === 'bkash'} onChange={() => handlePaymentMethodChange('bkash')} />
                </CardBody>
              </Card>
              <Card className="cursor-pointer" onClick={() => handlePaymentMethodChange('cashOnDel')}>
                <CardBody className={`p-2 sm:p-3 ${selectedMethod === 'cashOnDel' ? 'border-2 border-blue-500' : ''}`}>
                  <Radio name="paymentMethod" label="Cash On Delivery" checked={selectedMethod === 'cashOnDel'} onChange={() => handlePaymentMethodChange('cashOnDel')} />
                </CardBody>
              </Card>
            </div>
            {selectedMethod && (
              <div className="flex justify-center">
                <div onClick={handleOrder}><OrderButton /></div>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
