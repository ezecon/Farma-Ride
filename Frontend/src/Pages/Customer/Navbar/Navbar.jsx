import { Avatar, Button, Drawer, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../../../Components/Hook/useToken';
import { GiShoppingCart } from 'react-icons/gi';

export default function Navbar() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate('/login');
      }
      try {
        const response = await axios.post('http://localhost:5000/api/verifyToken', { token });

        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          removeToken();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    if (!userID) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userID}`);
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/carts/buyer/${userID}`);
        if (response.status === 200) {
          setCartItems(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
    fetchCartItems();
  }, [userID]);

  const updateQuantity = async (id, quantity, price) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/carts/update/${id}`, { quantity, price });
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
      await axios.delete(`http://localhost:5000/api/carts/delete/${id}`,);
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


  return (
    <div className='bg-[#ffffff] rounded-lg border border-[#d8d8d8] shadow-xl mb-2'>
      <div className="flex justify-between px-10 py-2">
        <div className="flex-1 water-text py-2">
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
                      src={`http://localhost:5000/uploads/${userInfo?.photo}`}
                      alt="avatar"
                      withBorder={true}
                      color='green'
                      className="p-0.5"
                    />
                  </MenuHandler>
                  <MenuList>
                    <Link to="/profile"><MenuItem className='font-mono'>Profile</MenuItem></Link>
                    <Link to="/dashboard"><MenuItem className='font-mono'>Dashboard</MenuItem></Link>
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
                <Button size="sm" className="mt-4" fullWidth>
                  Checkout
                </Button>
              </div>
            )}
          </Drawer>
        </Fragment>
      </div>
    </div>
  );
}
