import { useEffect, useState } from 'react';
import { useToken } from '../../../Components/Hook/useToken';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Button,
  Card,
  CardBody,
  Collapse,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import WayToCustomer from '../WaytoCustomer';
import WayToOwner from './WaytoOwner';

export default function Requests() {
  const [purchases, setPurchases] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [owners, setOwners] = useState({});
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [distinctOwners, setDistinctOwners] = useState([]);
  const [size, setSize] = useState(null);
  const [dialogOwner, setDialogOwner] = useState(null);
  const [dialogCustomer, setDialogCustomer] = useState(null);

  const handleOpen = (value) => setSize(value);
  const handleOpenOwnerDialog = (ownerId) => setDialogOwner(ownerId);
  const handleOpenCustomerDialog = (buyerId) => setDialogCustomer(buyerId);

  const toggleOpen = () => setOpen((cur) => !cur);

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
    if (!userID) return;

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${userID}`);
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) return;
      try {
        const purchasesResponse = await axios.get(`https://farma-ride-server.vercel.app/api/purchases/user/${userID}`);
        if (purchasesResponse.status === 200) {
          setPurchases(purchasesResponse.data);
        } else {
          toast.error('Error fetching purchases');
        }

        const medicinesResponse = await axios.get('https://farma-ride-server.vercel.app/api/medicines');
        if (medicinesResponse.status === 200) {
          setMedicines(medicinesResponse.data);
        } else {
          toast.error('Error fetching medicines');
        }

        const ownerIds = new Set(purchasesResponse.data.flatMap(purchase =>
          purchase.products.map(productId => {
            const medicine = medicinesResponse.data.find(med => med._id === productId);
            return medicine ? medicine.owner : null;
          })
        ));

        setDistinctOwners(Array.from(ownerIds));

        const ownerPromises = Array.from(ownerIds).map(async (id) => {
          if (id) {
            try {
              const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${id}`);
              return { id, name: response.data.name };
            } catch (error) {
              console.error(`Error fetching owner ${id}:`, error);
              return { id, name: 'Unknown' };
            }
          }
        });

        const ownerResults = await Promise.all(ownerPromises);
        const ownerMap = ownerResults.reduce((acc, { id, name }) => {
          acc[id] = name;
          return acc;
        }, {});

        setOwners(ownerMap);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, [userID]);

  const groupItemsByOwner = (products, quantities) => {
    return products.reduce((acc, productId, index) => {
      const medicine = medicines.find(med => med._id === productId);
      if (medicine && medicine.owner === userID) {
        const owner = medicine.owner;
        const medicineName = medicine.medicineName;
        const quantity = quantities[index];
        const price = medicine.price;

        if (!acc[owner]) {
          acc[owner] = { items: {}, total: 0 };
        }
        if (!acc[owner].items[medicineName]) {
          acc[owner].items[medicineName] = { count: 0, totalPrice: 0 };
        }
        acc[owner].items[medicineName].count += quantity;
        acc[owner].items[medicineName].totalPrice += price * quantity;
        acc[owner].total += price * quantity;
      }

      return acc;
    }, {});
  };

  const handleStatus = async (id, userID) => {
    try {
      const response = await axios.put(`https://farma-ride-server.vercel.app/api/purchases/rider/update/${id}`, { status: "Accepted", userID });
      if (response.status === 200) {
        toast.success("Accepted");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating status");
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-5 text-2xl text-center text-[goldenrod] font-bold">REQUESTS</h1>
      <div>
        {purchases
          .filter(purchase =>
            purchase.status !== "Pending" &&
            purchase.district === userInfo?.district &&
            purchase.division === userInfo?.division &&
            purchase.upazilas === userInfo?.upazilas
          )
          .map((purchase) => (
            <div key={purchase._id} >
              {Object.keys(groupItemsByOwner(purchase.products, purchase.quantity)).map((ownerId) => (
                <div key={ownerId} className="mb-5 p-4 border border-gray-200 rounded-lg shadow-lg montserrat-alternates-light">
                  <h2 className="font-bold mb-2">Purchase ID: {purchase._id}</h2>
                  <p className="text-black mb-2">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                  <h3 className="text-lg font-semibold">Owner: {owners[ownerId] || 'Unknown'}</h3>
                  <ul className="list-disc pl-5">
                    {Object.entries(groupItemsByOwner(purchase.products, purchase.quantity)[ownerId].items).map(([medicineName, { count, totalPrice }]) => (
                      <li key={medicineName} className="text-black">{medicineName} (x{count}) - Total: ${totalPrice.toFixed(2)}</li>
                    ))}
                  </ul>
                  <p className="font-semibold mb-2">Total: ${groupItemsByOwner(purchase.products, purchase.quantity)[ownerId].total.toFixed(2)}</p>
                  <p>Status: {purchase.status}</p>
                  {purchase.status === 'Accepted!' && <button onClick={() => handleStatus(purchase._id, userID)} className='bg-black text-white font-bold p-2 rounded'>Accept</button>}
                  {purchase.rider === userID && <Button onClick={toggleOpen} >View Details</Button>}
                  <Collapse open={open}>
                    <Card className="my-4 mx-auto w-8/12">
                      <CardBody>
                        <Typography className='flex flex-col justify-center'>
                          <h1 className='montserrat-alternates-bold text-xl text-[goldenrod] text-center'>Locations:</h1>
                          {distinctOwners.map((ownerId) => (
                            <Button onClick={() => handleOpenOwnerDialog(ownerId)} key={ownerId} className="mb-2">
                              SEE OWNER {owners[ownerId] || 'Unknown'}
                            </Button>
                          ))}
                          <Button onClick={() => handleOpenCustomerDialog(purchase.buyerId)} >SEE CUSTOMER</Button>
                        </Typography>
                      </CardBody>
                    </Card>
                  </Collapse>
                </div>
              ))}
            </div>
          ))}
      </div>

      <Dialog
        open={dialogOwner !== null}
        size="xxl"
        handler={() => setDialogOwner(null)}
      >
        <DialogHeader>Location: {owners[dialogOwner]}</DialogHeader>
        <DialogBody>
          <WayToOwner destination={dialogOwner} />
        </DialogBody>
      </Dialog>

      <Dialog
        open={dialogCustomer !== null}
        size="xxl"
        handler={() => setDialogCustomer(null)}
      >
        <DialogHeader>Location: Customer</DialogHeader>
        <DialogBody>
          <WayToCustomer destination={dialogCustomer} />
        </DialogBody>
      </Dialog>
    </div>
  );
}
