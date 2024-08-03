import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import toast from 'react-hot-toast';
import axios from 'axios';

const WayToOwner = ({ destination }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [dest, setDest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://farma-ride-server.vercel.app/api/users/${destination}`);
        if (response.status === 200) {
          setDest(response.data);
          console.log(dest)
        } else {
          toast.error('Error fetching destination');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching destination');
      }
    };

    if(destination){fetchData();}
  }, [destination]);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      const map = L.map(mapRef.current).setView([latitude, longitude], 11);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      markerRef.current = L.marker([latitude, longitude]).addTo(map);

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          dest ? L.latLng(dest.latitude, dest.longitude) : L.latLng(latitude, longitude),
        ],
        routeWhileDragging: true,
      }).addTo(map);

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = [latitude, longitude];

          markerRef.current.setLatLng(newLatLng);
          map.setView(newLatLng, 11);

          if (dest) {
            routingControlRef.current.setWaypoints([
              L.latLng(latitude, longitude),
              L.latLng(dest.latitude, dest.longitude),
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

      return () => {
        navigator.geolocation.clearWatch(watchId);
        map.off();
        map.remove();
      };
    };

    if (dest) {
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
    }
  }, [mapInitialized, dest]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>;
};

export default WayToOwner;
