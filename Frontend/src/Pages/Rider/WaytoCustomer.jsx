import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const WayToCustomer = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Function to initialize the map
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

      // Watch position and update marker
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLatLng = [latitude, longitude];

          // Update the marker position
          markerRef.current.setLatLng(newLatLng);
          map.setView(newLatLng, 11);
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

      // Handle map clicks
      map.on('click', function (e) {
        const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        L.Routing.control({
          waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng),
          ],
        }).on('routesfound', function (e) {
          const routes = e.routes;
          console.log(routes);
        }).addTo(map);
      });

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

  }, [mapInitialized]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>;
};

export default WayToCustomer;
