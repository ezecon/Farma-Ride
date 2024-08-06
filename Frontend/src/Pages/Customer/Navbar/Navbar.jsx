import { Avatar, Button, Card, CardBody, Dialog, DialogBody, DialogHeader, Drawer, IconButton, Menu, MenuHandler, MenuItem, MenuList, Radio, Tooltip, Typography } from '@material-tailwind/react';
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
  const [latitudeX, setLatitudeX] = useState(null);
  const [longitudeX, setLongitudeX] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitudeShared(position.coords.latitude);
          setLongitudeShared(position.coords.longitude);
          toast.success('Shared!')
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const handleOpenX = () => setOpenX(!openX);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
        return;
      }
      try {
        const response = await axios.post('https://farma-ride-server.vercel.app/api/verifyToken', { token });
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data);
            setLatitudeX(response.data.latitude);
            setLongitudeX(response.data.longitude);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    const fetchCartItems = async () => {
      if (userID) {
        try {
          const response = await axios.get(`https://farma-ride-server.vercel.app/api/carts/buyer/${userID}`);
          if (response.status === 200) {
            setCartItems(response.data);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching cart items:', err);
        }
      }
    };

    if (userID) {
      fetchUserInfo();
      fetchCartItems();
    }
  }, [userID]);

  const updateQuantity = async (id, quantity, price) => {
    if (quantity < 1) return;
    try {
      await axios.put(`https://farma-ride-server.vercel.app/api/carts/update/${id}`, { quantity, price });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity, price } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://farma-ride-server.vercel.app/api/carts/delete/${id}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.singlePrice * item.quantity, 0).toFixed(2);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const deleteItem = async (buyerId) => {
    try {
      await axios.delete(`https://farma-ride-server.vercel.app/api/carts/${buyerId}`);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleOrder = async () => {
    const latitude = latitudeShared ?? latitudeX;
    const longitude = longitudeShared ?? longitudeX;

    if (!cartItems.length) {
      toast.error("Cart is empty!");
      return;
    }

    if (!selectedMethod) {
      toast.error("Select Method");
      return;
    }

    try {
      const response = await axios.post(`https://farma-ride-server.vercel.app/api/purchases/buy`, {
        buyerId: userID,
        sellerIds: cartItems.map(item => item.ownerId),
        products: cartItems.map(item => item.productId),
        quantity: cartItems.map(item => item.quantity),
        price: cartItems.map(item => item.price),
        latitude,
        longitude,
        division: userInfo.division,
        district: userInfo.district,
        upazilas:userInfo.upazilas,
        buyType: selectedMethod,
      });
      if (response.status === 200) {
        toast.success("Order Done!");
        
        deleteItem(userID);
        const timeout = setTimeout(() => {
          setOpenX(false);

        }, 5000); 
    
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-[#ffffff] rounded-lg border border-[#d8d8d8] shadow-xl mb-2'>
      <div className="flex justify-between px-10 py-2">
        <div className="flex-1 water-text py-2 water-text">
          <a href="/customer">
            <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
            <h1 className="font-bold sm:text-lg md:text-xl text-white">FARMA-RIDE</h1>
          </a>
        </div>
        <div className="">
          <ul className="flex space-x-6 pt-2">
            <li>
              <Tooltip content="Search for medicines">
                <a className="text-Black hover:underline hover:underline-offset-4" href="/customer/search">
                  <FaSearch className='pr-4 text-4xl' />
                </a>
              </Tooltip>
            </li>
            <li>
              <Tooltip content="Cart">
                <GiShoppingCart className='pr-3 text-4xl hover:text-[goldenrod]' onClick={openDrawer} />
              </Tooltip>
            </li>
            <li>
              <div className="flex items-center gap-x-1">
                <Menu>
                  <MenuHandler>
                    <Avatar
                      src={userInfo?.photo}
                      alt="avatar"
                      withBorder={true}
                      color='green'
                      className="p-0.5"
                    />
                  </MenuHandler>
                  <MenuList>
                    <Link to="/customer/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                    <Link to="/customer/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
                    <MenuItem onClick={handleLogout} className='font-mono'>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Fragment>
          <Drawer placement="right" open={open} onClose={closeDrawer} className="p-4">
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" className="text-[goldenrod]">
                CART
              </Typography>
              <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            {cartItems.length === 0 ? (
              <Typography color="gray" className="mb-8 pr-4 font-normal">
                Your cart is empty.
              </Typography>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item._id} className="mb-4 flex items-center justify-between">
                    <div>
                      <Typography variant="h6">{item.medicineName}</Typography>
                      <Typography color="gray">
                        {item.quantity} x ৳{item.singlePrice.toFixed(2)}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outlined" onClick={() => updateQuantity(item._id, item.quantity - 1, (item.price - item.singlePrice))}>
                        -
                      </Button>
                      <Typography>{item.quantity}</Typography>
                      <Button size="sm" variant="outlined" onClick={() => updateQuantity(item._id, item.quantity + 1, (item.price + item.singlePrice))}>
                        +
                      </Button>
                      <IconButton variant="text" color="red" onClick={() => removeItem(item._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </IconButton>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">৳{calculateTotal()}</Typography>
                </div>
                <Button size="sm" className="mt-4 bg-[goldenrod]" fullWidth onClick={handleOpenX}>
                  Checkout
                </Button>
              </div>
            )}
          </Drawer>
        </Fragment>
      </div>
      <div>
  <Dialog open={openX} handler={handleOpenX}>
    <DialogHeader className="text-[goldenrod] text-center text-2xl montserrat-alternates-light">
      Order Confirmation
    </DialogHeader>
    <DialogBody>
      <div className="space-y-6">
        <div className="border rounded-lg p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold mb-2">Address:</h1>
          <p className="text-gray-600 mb-4">Want to use your default address?</p>
          <div className="mb-5">
            {userInfo && userInfo.latitude && userInfo.longitude && (
              <Map className="w-full h-64 rounded-lg" latitude={userInfo.latitude} longitude={userInfo.longitude} />
            )}
            <p className="montserrat-alternates-light text-sm">
              If you want to use the default address, no need to select anything
            </p>
          </div>
          <p className="text-gray-600 mb-4">or,</p>
          <Button onClick={handleLiveLocation} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto">
            Live
          </Button>
        </div>
        <div className="border rounded-lg p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold mb-2">Payment Method:</h1>
          <div className="flex space-y-4 mb-6">
            <Card className="cursor-pointer" onClick={() => handlePaymentMethodChange('bkash')}>
              <CardBody className={`p-4 ${selectedMethod === 'bkash' ? 'border-2 border-blue-500' : ''}`}>
                <Radio
                  name="paymentMethod"
                  label="with Bkash"
                  checked={selectedMethod === 'bkash'}
                  onChange={() => handlePaymentMethodChange('bkash')}
                />
              </CardBody>
            </Card>
            <Card className="cursor-pointer" onClick={() => handlePaymentMethodChange('cashOnDel')}>
              <CardBody className={`p-4 ${selectedMethod === 'cashOnDel' ? 'border-2 border-blue-500' : ''}`}>
                <Radio
                  name="paymentMethod"
                  label="Cash On Delivery"
                  checked={selectedMethod === 'cashOnDel'}
                  onChange={() => handlePaymentMethodChange('cashOnDel')}
                />
              </CardBody>
            </Card>
          </div>
          {selectedMethod && (
            <div className="flex justify-center">
              <div onClick={handleOrder}><OrderButton /></div>
            </div>
          )}
        </div>
      </div>
    </DialogBody>
  </Dialog>
</div>

    </div>
  );
}