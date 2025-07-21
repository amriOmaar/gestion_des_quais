"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PlusCircle } from "lucide-react";

interface Place {
  _id: string;
  nom: string;
  estReservee: boolean;
}

export default function ListePlaces() {
    const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/places/getAllPlaces")
      .then((res) => res.json())
      .then(setPlaces)
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const reserverPlace = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/places/updatePlace/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bateauId: "ID_BATEAU_CONNECTÉ" }), 
        
      });
      const data = await res.json();
      if (res.ok) {
        setPlaces((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, estReservee: true } : p
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Erreur réservation :", err);
    }
  };

  return (
    
  <div className="p-6">

    {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Marchandises
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Liste des marchandises enregistrées
          </p>
        </div>
        <button
          onClick={() => router.push("/add-place")}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Ajouter
        </button>
      </div>

    <div className="flex flex-wrap gap-4 p-6 justify-center">
      {places.map((place) => (
        <div
          key={place._id}
          onClick={() => !place.estReservee && reserverPlace(place._id)}
          className={`w-24 h-24 flex items-center justify-center rounded-lg text-white font-bold cursor-pointer transition ${
            place.estReservee ? "bg-red-500" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {place.nom}
        </div>
      ))}
    </div>
    </div>
  );
}
