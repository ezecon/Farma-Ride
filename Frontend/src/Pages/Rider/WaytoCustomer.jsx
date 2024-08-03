import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const WayToCustomer = ({ destination }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (destination && map) {
      // Recalculate route when destination or map changes
      L.Routing.control({
        waypoints: [
          L.latLng(markerRef.current.getLatLng()),
          L.latLng(destination.lat, destination.lng),
        ],
        routeWhileDragging: true,
      }).addTo(map);
    }
  }, [destination, map]);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      const newMap = L.map(mapRef.current).setView([latitude, longitude], 11);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Leaflet &copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(newMap);

  

      markerRef.current = L.marker([latitude, longitude], ).addTo(newMap);
      setMap(newMap);

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = [latitude, longitude];

          markerRef.current.setLatLng(newLatLng);
          newMap.setView(newLatLng, 11);

          // Update route
          if (destination) {
            L.Routing.control({
              waypoints: [
                L.latLng(newLatLng),
                L.latLng(destination.lat, destination.lng),
              ],
              routeWhileDragging: true,
            }).addTo(newMap);
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
        newMap.off();
        newMap.remove();
      };
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
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
  }, [destination]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>;
};

export default WayToCustomer;
