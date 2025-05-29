import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import TruckImg from "../Assets/images/Truck-img.png";
import VanImg from "../Assets/images/Van-img.png";
import Sidebar2 from "../components/Sidebar2";

const routePositions = [
  [1.3521, 103.8198],
  [1.3550, 103.8250],
  [1.3575, 103.8320],
  [1.3601, 103.8400],
  [1.3650, 103.8450],
  [1.3700, 103.8500],
];

const trucksData = [
  { id: 1, plate: "YR-34DFR734W2", status: "Active", partner: "Past Hawk", type: "truck", route: "57 min. left", countdown: "62 min 0 sec" },
  { id: 2, plate: "XZ-12PLT999Z1", status: "Inactive", partner: "Roambee", type: "van", route: "DS Kidney" },
  { id: 3, plate: "MG-89XPT773M4", status: "Active", partner: "Shipniko", type: "van", route: "244 Angels", countdown: "72 min 0 sec" },
  { id: 4, plate: "LP-00ABC777W7", status: "Active", partner: "Loginext", type: "truck", route: "36 Dickinson", countdown: "15 min 0 sec" },
  { id: 5, plate: "CV-14ER85SER", status: "Inactive", partner: "Roambee", type: "van", route: "153 Kidney" },
  { id: 6, plate: "BG-ER748694R", status: "Active", partner: "Shipniko", type: "truck", route: "244 Angels", countdown: "19 min 0 sec" },
  { id: 7, plate: "DW-847DE74E4R", status: "Active", partner: "Past Hawk", type: "van", route: "88 mins left", countdown: "36 min 0 sec" },
  { id: 8, plate: "RE-74ER453TR5", status: "Active", partner: "Loginext", type: "truck", route: "56 mins left", countdown: "56 min 0 sec" },
  { id: 9, plate: "ND-00GHR841JQ", status: "Inactive", partner: "Shipniko", type: "truck", route: "Depot 5 Warehouse" },
  { id: 10, plate: "ZX-91TKB991PE", status: "Active", partner: "Roambee", type: "van", route: "56 mins left", countdown: "40 min 0 sec" },
  { id: 11, plate: "MN-56RKE712AB", status: "Active", partner: "Past Hawk", type: "truck", route: "Terminal 3", countdown: "57 min 0 sec" },
  { id: 12, plate: "PT-28FQE663CV", status: "Inactive", partner: "Loginext", type: "van", route: "Hub 1 - Zone B" },
  { id: 13, plate: "AX-11RET348XY", status: "Active", partner: "Shipniko", type: "truck", route: "Route A5 Checkpoint", countdown: "61 min 0 sec" },
  { id: 14, plate: "KP-77HUE991KT", status: "Inactive", partner: "Roambee", type: "van", route: "Drop Off @ Marina" },
  { id: 15, plate: "QU-82ODR234YZ", status: "Active", partner: "Past Hawk", type: "truck", route: "Sentosa Junction", countdown: "75 min 0 sec" },
  { id: 16, plate: "CV-45WTR777VZ", status: "Active", partner: "Loginext", type: "van", route: "Hilltop Bay Area", countdown: "34 min 0 sec" },
];



const partners = ["Shipniko", "Roambee", "Past Hawk", "Loginext"];
const statuses = ["Active", "Inactive", "All"];

export default function TrackingPage() {
  const [selectedPartner, setSelectedPartner] = useState("Past Hawk");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckPositionIndex, setTruckPositionIndex] = useState(0);
  const [etaTime] = useState(new Date(Date.now() + 45 * 60000));
  const [countdown, setCountdown] = useState("45 min 0 sec");

  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPositionIndex((prev) => (prev + 1) % routePositions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, etaTime - now);
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown(`${mins} min ${secs < 10 ? "0" : ""}${secs} sec`);
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [etaTime]);

  const filteredTrucks = trucksData.filter((truck) => {
    const matchPartner = truck.partner === selectedPartner;
    const matchStatus = selectedStatus === "All" || truck.status === selectedStatus;
    return matchPartner && matchStatus;
  });

  return (
    <div className="flex h-screen font-sans text-gray-800 relative">
      {/* Sidebar */}
        <Sidebar2 />

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Tracking</h2>

          <div className="mb-3">
            <p className="text-sm font-medium mb-1 text-gray-700">Filter by Partners</p>
            <div className="flex flex-wrap gap-2">
              {partners.map((partner) => (
                <button
                  key={partner}
                  onClick={() => setSelectedPartner(partner)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    selectedPartner === partner
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
                  }`}
                >
                  {partner}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1 text-gray-700">Show</p>
            <div className="flex gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    selectedStatus === status
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Truck Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTrucks.map((truck) => (
            <div
              key={truck.id}
              onClick={() => setSelectedTruck(truck)}
              className={`cursor-pointer bg-white p-4 rounded-2xl border shadow-sm hover:shadow-md hover:border-pink-500 transition-all duration-200 flex gap-4 items-center ${
                selectedTruck?.id === truck.id ? "border-pink-500 shadow-md" : "border-gray-200"
              }`}
            >
              <img
                src={truck.type === "van" ? VanImg : TruckImg}
                alt={truck.type}
                className="w-28 h-28 object-contain rounded-xl"
              />

              <div className="flex flex-col flex-grow text-sm space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{truck.plate}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                      truck.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    ● {truck.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">Partner: <span className="text-gray-700">{truck.partner}</span></p>
                <p className="text-gray-500 text-xs">Route: <span className="text-gray-700">{truck.route}</span></p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-[11px] text-gray-400">ETA</p>
                    <p className="text-sm text-gray-700 font-semibold">
                      {truck.countdown || "--"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Type</p>
                    <p className="text-sm text-gray-700 font-semibold capitalize">{truck.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <MapContainer center={routePositions[truckPositionIndex]} zoom={13} className="h-64 w-full z-0">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline positions={routePositions} color="red" />
            <Marker position={routePositions[truckPositionIndex]}>
              <Popup>Truck live position</Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
    </div>
  );
}






