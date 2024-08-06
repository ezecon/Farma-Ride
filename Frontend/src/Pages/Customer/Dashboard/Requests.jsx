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

  // Group items by their owners within each purchase, including counts
  const groupItemsByOwner = (products, quantities) => {
    return products.reduce((acc, productId, index) => {
      const medicine = medicines.find(med => med._id === productId);
      const owner = medicine ? medicine.owner : 'Unknown';
      const medicineName = medicine ? medicine.medicineName : 'Unknown';
      const quantity = quantities[index];

      if (!acc[owner]) {
        acc[owner] = {};
      }
      if (!acc[owner][medicineName]) {
        acc[owner][medicineName] = 0;
      }
      acc[owner][medicineName] += quantity;

      return acc;
    }, {});
  };

  const handleRec = async (id) => {
    try {
      const response = await axios.put(`https://farma-ride-server.vercel.app/api/purchases/customer/update/${id}`);
      if (response.status === 200) {
        toast.success("Status updated to Delivered");
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
        {purchases.map((purchase) => (
          <div key={purchase._id} className="mb-5 p-4 border border-gray-200 rounded-lg shadow-lg montserrat-alternates-light">
            <h2 className="font-bold mb-2">Purchase ID: {purchase._id}</h2>
            <p className="text-black mb-2">Date: {new Date(purchase.date).toLocaleDateString()}</p>
            <p className="font-semibold mb-2">Total: {purchase.price.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</p>

            {/* Group items by owner */}
            {Object.keys(groupItemsByOwner(purchase.products, purchase.quantity)).map((ownerId) => (
              <div key={ownerId} className="mb-3">
                <h3 className="text-lg font-semibold">Owner: {owners[ownerId] || 'Unknown'}</h3>
                <ul className="list-disc pl-5">
                  {Object.entries(groupItemsByOwner(purchase.products, purchase.quantity)[ownerId]).map(([medicineName, count]) => (
                    <li key={medicineName} className="text-black">{medicineName} (x{count})</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>Status: {purchase.status}</p>
           {purchase.rider && (
              <p>
                Rider ID: {purchase.rider} || <a className='font-bold p-2 bg-black text-white rounded-md' href={`/customer/check-user/${purchase.rider}`}>Check User</a>
              </p>
            )}
            {purchase.status === 'On the way' && (
              <button
                onClick={() => handleRec(purchase._id)}
                className="bg-black text-white font-bold p-2 rounded"
              >
                Received
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
