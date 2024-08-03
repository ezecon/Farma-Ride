import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import toast from 'react-hot-toast';
import axios from 'axios';

const WayToCustomer = ({ destination }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [dest, setDest] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
    try {
      const purchasesResponse = await axios.get(`https://farma-ride-server.vercel.app/api/purchases/dest1/${destination}`);
      if (purchasesResponse.status === 200) {
        setDest(purchasesResponse.data);
        console.log(dest)
      } else {
        toast.error('Error fetching purchases');
      }
    }catch(err){
        console.log(err)
      }
  }
  fetchData()
  })
  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      const map = L.map(mapRef.current).setView([latitude, longitude], 11);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      const taxiIcon = L.icon({
        iconUrl: 'taxi.png',
        iconSize: [70, 70],
      });

      // Initialize the marker at the current position
      markerRef.current = L.marker([latitude, longitude], { icon: taxiIcon }).addTo(map);

      // Initialize routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          dest ? L.latLng(dest.latitude, dest.longitude) : L.latLng(latitude, longitude),
        ],
        routeWhileDragging: true,
      }).addTo(map);

      // Watch position and update marker
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = [latitude, longitude];

          // Update the marker position
          markerRef.current.setLatLng(newLatLng);
          map.setView(newLatLng, 11);

          // Update route waypoints without creating a new routing control
          if (destination) {
            routingControlRef.current.setWaypoints([
              L.latLng(latitude, longitude),
              L.latLng(destination.lat, destination.lng),
            ]);
          }
        },
        (error) => {
          console.error('Error watching position:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      // Clean up on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
        map.off();
        map.remove();
      };
    };

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!mapInitialized) {
          initializeMap(latitude, longitude);
          setMapInitialized(true);
        }
      },
      (error) => {
        console.error('Error getting current position:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }, [mapInitialized, destination]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>;
};

export default WayToCustomer;
