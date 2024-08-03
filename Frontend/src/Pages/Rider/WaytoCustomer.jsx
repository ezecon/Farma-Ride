import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// URL to a red marker icon image
const redMarkerIconUrl = 'https://png.pngtree.com/png-clipart/20230123/original/pngtree-flat-red-location-sign-png-image_8927579.png';

const WayToCustomer = ({ destination }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routingRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!destination) return; // Ensure destination is available before proceeding

    if (map && markerRef.current) {
      // Remove previous routing control if it exists
      if (routingRef.current) {
        routingRef.current.remove();
      }

      // Calculate new route
      routingRef.current = L.Routing.control({
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

      const redIcon = L.icon({
        iconUrl: redMarkerIconUrl,
        iconSize: [40, 40], // Adjust size if necessary
      });

      markerRef.current = L.marker([latitude, longitude], { icon: redIcon }).addTo(newMap);
      setMap(newMap);

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = [latitude, longitude];

          markerRef.current.setLatLng(newLatLng);
          newMap.setView(newLatLng);

          // Update route if destination is available
          if (destination) {
            if (routingRef.current) {
              routingRef.current.remove();
            }

            routingRef.current = L.Routing.control({
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
