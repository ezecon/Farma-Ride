import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { useToken } from "../../../Components/Hook/useToken";

export default function Requests() {
  const [purchases, setPurchases] = useState([]);
  const [userID, setUserID] = useState(null);
  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  /* ================= VERIFY TOKEN ================= */
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        navigate("/login");
        return;
      }

      try {
        const res = await axios.post(
          "https://farma-ride-server.vercel.app/api/verifyToken",
          { token }
        );

        if (res.data.valid) {
          setUserID(res.data.decoded.id);
        } else {
          removeToken();
          navigate("/login");
        }
      } catch {
        removeToken();
        navigate("/login");
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  /* ================= FETCH PURCHASES ================= */
  useEffect(() => {
    if (!userID) return;

    const fetchPurchases = async () => {
      try {
        const res = await axios.get(
          "https://farma-ride-server.vercel.app/api/purchases"
        );
        setPurchases(res.data || []);
      } catch {
        toast.error("Failed to load requests");
      }
    };

    fetchPurchases();
  }, [userID]);

  /* ================= TOTAL COST ================= */
  const getTotalCost = (price, quantity) => {
    return price.reduce(
      (sum, p, index) => sum + p * quantity[index],
      0
    );
  };

  /* ================= ACCEPT REQUEST ================= */
  const handleAccept = async (purchaseId) => {
    try {
      await axios.put(
        `https://farma-ride-server.vercel.app/api/purchases/rider/update/${purchaseId}`,
        {
          status: "Accepted",
          userID,
        }
      );

      toast.success("Request Accepted");

      setPurchases((prev) =>
        prev.map((p) =>
          p._id === purchaseId ? { ...p, status: "Accepted" } : p
        )
      );
    } catch {
      toast.error("Failed to accept request");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-[goldenrod] mb-5">
        REQUESTS
      </h1>

      {purchases
        .filter((p) => p.status === "Pending")
        .map((purchase) => (
          <div
            key={purchase._id}
            className="border rounded-lg p-4 mb-4 shadow"
          >
            <p>
              <b>Purchase ID:</b> {purchase._id}
            </p>

            <p>
              <b>Buyer Phone:</b> {purchase.buyerPhone}
            </p>

            <p>
              <b>Payment:</b> {purchase.buyType}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(purchase.date).toLocaleString()}
            </p>

            {/* ITEMS */}
            <ul className="list-disc pl-5 my-3">
              {purchase.price.map((p, index) => (
                <li key={index}>
                   {purchase.productsName[index]} — ৳{p} ×{" "}
                  {purchase.quantity[index]}
                </li>
              ))}
            </ul>

            {/* TOTAL COST */}
            <p className="font-bold">
              Total Cost: ৳
              {getTotalCost(
                purchase.price,
                purchase.quantity
              )}
            </p>

            {/* ACCEPT BUTTON */}
            <Button
              onClick={() => handleAccept(purchase._id)}
              className="mt-3"
            >
              Accept
            </Button>
          </div>
        ))}
    </div>
  );
}
