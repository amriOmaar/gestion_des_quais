"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddMarchandiseForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    conteneur: "",
    description: "",
    bateau: "",
  });

  const [bateaux, setBateaux] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/bateaux/getAllBateaux")
      .then((res) => res.json())
      .then((data) => setBateaux(data))
      .catch((err) => console.error("Erreur lors du chargement des bateaux :", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { conteneur, description, bateau } = formData;

    if (!conteneur.trim() || !description.trim() || !bateau.trim()) {
      setMessage("❌ Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/marchandises/addMarchandise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Marchandise ajoutée avec succès !");
        setTimeout(() => {
          router.push("/list-marchandises");
        }, 1000);
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de l’ajout."}`);
      }
    } catch (error) {
      setMessage("❌ Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Ajouter une Marchandise
        </h1>
        {message && (
          <p
            className={`mt-2 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate
      >
        <input
          name="conteneur"
          placeholder="Numéro de conteneur"
          value={formData.conteneur}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-transparent dark:text-white"
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-transparent dark:text-white"
        />

        <select
          name="bateau"
          value={formData.bateau}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-green-500 dark:bg-transparent dark:text-white"
        >
          <option value="">-- Sélectionner un bateau --</option>
          {bateaux.map((b: any) => (
            <option key={b._id} value={b._id}>
              {b.nom}
            </option>
          ))}
        </select>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
