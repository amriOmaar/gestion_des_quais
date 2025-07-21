"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReserveModal from "./ReserveModal";
import { CheckCircle } from "lucide-react";

interface Place {
  _id: string;
  nom: string;
  estReservee: boolean;
  justReserved?: boolean;
  bateau?: {
    nom: string;
    numero: number;
  };
}

export default function PlacesBoard() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filter, setFilter] = useState<"all" | "reserved" | "free">("all");

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    const res = await fetch("http://localhost:5000/places/getAllPlaces");
    const data = await res.json();
    setPlaces(data);
  };

  const handleReserveClick = (place: Place) => {
    if (!place.estReservee) {
      setSelectedPlace(place);
    }
  };

  const handleReservationComplete = async () => {
    setSelectedPlace(null);

    const res = await fetch("http://localhost:5000/places/getAllPlaces");
    const updated = await res.json();

    const lastReserved = updated.find(
      (p: any) => p.estReservee && !places.find(x => x._id === p._id)?.estReservee
    );
    if (lastReserved) lastReserved.justReserved = true;

    setPlaces(updated);

    setTimeout(() => {
      setPlaces(updated.map((p: any) => ({ ...p, justReserved: false })));
    }, 2000);
  };

  const filteredPlaces = places.filter((place) => {
    if (filter === "reserved") return place.estReservee;
    if (filter === "free") return !place.estReservee;
    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-4">
        <label className="text-gray-700 dark:text-white font-medium">
          Filtrer
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="p-2 rounded-md border dark:bg-transparent dark:text-white"
        >
          <option value="all">Toutes les places</option>
          <option value="free">Places libres</option>
          <option value="reserved">Places réservées</option>
        </select>
        
      </div>
      <br></br>

      <div className="flex flex-wrap gap-4">
        <AnimatePresence>
          {filteredPlaces.map((place) => (
            <motion.div
              key={place._id}
              onClick={() => handleReserveClick(place)}
              className="relative w-28 h-28 p-2 text-sm text-white font-bold rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer text-center"
              initial={{ scale: 1 }}
              animate={{
                backgroundColor: place.justReserved
                  ? "#facc15"
                  : place.estReservee
                  ? "#dc2626"
                  : "#16a34a",
                scale: place.justReserved ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div>{place.nom}</div>

              {place.estReservee && place.bateau && (
                <div className="text-xs mt-1 opacity-90 font-normal">
                  {place.bateau.nom}
                </div>
              )}

              {place.estReservee && (
                <div className="absolute top-1 right-1">
                  <CheckCircle className="w-5 h-5 text-white drop-shadow" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedPlace && (
        <ReserveModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onSuccess={handleReservationComplete}
        />
      )}
    </div>
  );
}