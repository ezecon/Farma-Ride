import { useEffect, useState } from 'react';
import { useToken } from '../../../Components/Hook/useToken';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Requests() {
  const [purchases, setPurchases] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [owners, setOwners] = useState({}); // State to store owner names
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

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

        // Fetch owner names
        const ownerIds = new Set(purchasesResponse.data.flatMap(purchase => purchase.products.map(productId => {
          const medicine = medicinesResponse.data.find(med => med._id === productId);
          return medicine ? medicine.owner : null;
        })));

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

  // Group items by their owners within each purchase, including counts and total price
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
  const handleStatus = async (id) => {
    try {
      const response = await axios.put(`https://farma-ride-server.vercel.app/api/purchases/update/${id}`, { status: "Accepted" });
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
        .filter(purchase=>purchase.status==="Pending")
        .map((purchase) => (
          <div key={purchase._id} >

            {/* Group items by owner */}
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
                {purchase.status === 'Pending' && <button onClick={()=>handleStatus(purchase._id)} className='bg-black text-white font-bold p-2 rounded'>Accept</button>}
              </div>
            ))}
            
          </div>
        ))}
      </div>
    </div>
  );
}
