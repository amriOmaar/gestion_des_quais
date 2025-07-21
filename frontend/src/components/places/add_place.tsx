"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlaceForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: "",
    estReservee: false,
    bateau: "",
  });

  const [bateaux, setBateaux] = useState([]);
  const [message, setMessage] = useState("");

  // Charger tous les bateaux pour la sélection
  useEffect(() => {
    fetch("http://localhost:5000/bateaux/getAllBateaux")
      .then((res) => res.json())
      .then((data) => setBateaux(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des bateaux :", err)
      );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom.trim()) {
      setMessage("❌ Le nom de la place est obligatoire.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/places/addPlace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          estReservee: formData.estReservee,
          bateau: formData.estReservee ? formData.bateau : null,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Place ajoutée avec succès !");
        setFormData({
          nom: "",
          estReservee: false,
          bateau: "",
        });
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de l’ajout."}`);
      }
    } catch (err) {
      setMessage("❌ Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Ajouter une Place de Port
      </h1>

      {message && (
        <p
          className={`mb-4 text-center font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom de la place (ex: A.1)"
          value={formData.nom}
          onChange={handleChange}
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="estReservee"
            checked={formData.estReservee}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-700 dark:text-white">
            Place réservée ?
          </label>
        </div>

        {formData.estReservee && (
          <select
            name="bateau"
            value={formData.bateau}
            onChange={handleChange}
            required
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          >
            <option value="">-- Sélectionner un bateau --</option>
            {bateaux.map((b: any) => (
              <option key={b._id} value={b._id}>
                {b.nom}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}