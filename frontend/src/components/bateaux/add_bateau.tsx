"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddBateauForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: "",
    numero: "",
    adresse: "",
    pays: "",
    marque: "",
    date_entre: "",
    date_sortie: "",
    marin: "",
  });

  const [marins, setMarins] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        const filteredMarins = data.filter((u) => u.poste === "marin");
        setMarins(filteredMarins);
      })
      .catch((err) => console.error("Erreur chargement marins:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      nom,
      numero,
      adresse,
      pays,
      marque,
      date_entre,
      date_sortie,
    } = formData;

    if (
      !nom.trim() ||
      !numero.trim() ||
      !adresse.trim() ||
      !pays.trim() ||
      !marque.trim() ||
      !date_entre.trim() ||
      !date_sortie.trim()
    ) {
      setMessage("❌ Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/bateaux/addBateau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          numero: Number(formData.numero),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Bateau ajouté avec succès !");
        setTimeout(() => {
          router.push("/list-bateau");
        }, 1000);
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de l’ajout."}`);
      }
    } catch {
      setMessage("❌ Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Ajouter un Bateau
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
          name="nom"
          placeholder="Nom du bateau"
          value={formData.nom}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="numero"
          type="number"
          placeholder="Numéro unique"
          value={formData.numero}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="adresse"
          placeholder="Adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="pays"
          placeholder="Pays"
          value={formData.pays}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="marque"
          placeholder="Marque"
          value={formData.marque}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="date_entre"
          type="date"
          value={formData.date_entre}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />
        <input
          name="date_sortie"
          type="date"
          value={formData.date_sortie}
          onChange={handleChange}
          required
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        />

        <select
          name="marin"
          value={formData.marin}
          onChange={handleChange}
          className="border p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        >
          <option value="">-- Sélectionner un marin --</option>
          {marins.map((m: any) => (
            <option key={m._id} value={m._id}>
              {m.nom} {m.prenom}
            </option>
          ))}
        </select>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}