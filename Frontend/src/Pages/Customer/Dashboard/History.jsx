import { useEffect, useState } from 'react';
import { useToken } from '../../../Components/Hook/useToken';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function History() {
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

  // Group items by their owners within each purchase
  const groupItemsByOwner = (products) => {
    return products.reduce((acc, productId) => {
      const medicine = medicines.find(med => med._id === productId);
      const owner = medicine ? medicine.owner : 'Unknown';
      if (!acc[owner]) {
        acc[owner] = [];
      }
      acc[owner].push(medicine ? medicine.medicineName : 'Unknown');
      return acc;
    }, {});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="py-5 text-2xl text-center text-[goldenrod] font-bold">HISTORY</h1>
      <div>
        {purchases
        .filter(purchase=>purchase.status==="Delivered")
        .map((purchase) => (
          <div key={purchase._id} className="mb-5 p-4 border border-gray-200 rounded-lg shadow-lg montserrat-alternates-light">
            <h2 className=" font-bold mb-2">Purchase ID: {purchase._id}</h2>
            <p className="text-black mb-2">Date: {new Date(purchase.date).toLocaleDateString()}</p>
            <p className="font-semibold mb-2">Total: {purchase.price.reduce((acc, curr) => acc + curr, 0).toFixed(2)}</p>

            {/* Group items by owner */}
            {Object.keys(groupItemsByOwner(purchase.products)).map((ownerId) => (
              <div key={ownerId} className="mb-3">
                <h3 className="text-lg font-semibold">Owner: {owners[ownerId] || 'Unknown'}</h3>
                <ul className="list-disc pl-5">
                  {groupItemsByOwner(purchase.products)[ownerId].map((item, index) => (
                    <li key={index} className="text-black">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>Status: {purchase.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}                          
