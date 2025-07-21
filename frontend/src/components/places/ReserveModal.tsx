"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  place: {
    _id: string;
    nom: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReserveModal({ place, onClose, onSuccess }: Props) {
  const [bateaux, setBateaux] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    bateau: "",
    dateEntree: "",
    dateSortie: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/bateaux/getAllBateaux")
      .then((res) => res.json())
      .then((data) => setBateaux(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bateau || !formData.dateEntree || !formData.dateSortie) {
      setMessage("❌ Tous les champs sont obligatoires.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/places/updatePlace/${place._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estReservee: true,
          bateau: formData.bateau,
          dateEntree: formData.dateEntree,
          dateSortie: formData.dateSortie,
        }),
      });

      if (res.ok) {
        setMessage("✅ Réservation réussie !");
        onSuccess();
      } else {
        const result = await res.json();
        setMessage(`❌ ${result.message || "Erreur."}`);
      }
    } catch {
      setMessage("❌ Erreur serveur.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Réserver la place {place.nom}
        </h2>

        {message && (
          <p className={`text-sm text-center mb-3 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="bateau"
            value={formData.bateau}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-transparent dark:text-white"
          >
            <option value="">-- Sélectionner un bateau --</option>
            {bateaux.map((b) => (
              <option key={b._id} value={b._id}>
                {b.nom} ({b.numero})
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dateEntree"
            value={formData.dateEntree}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-transparent dark:text-white"
            placeholder="Date d'entrée"
          />

          <input
            type="date"
            name="dateSortie"
            value={formData.dateSortie}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-transparent dark:text-white"
            placeholder="Date de sortie"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
          >
            Confirmer la réservation
          </button>
        </form>
      </div>
    </div>
  );
}
