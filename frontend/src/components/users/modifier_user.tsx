"use client";

import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  username: string;
  nom: string;
  prenom: string;
  tel: number;
  mail: string;
  entreprise: string;
  poste: "employee" | "marin";
  role: "admin" | "employee";
}

interface ModifyUserProps {
  user: User;
  onClose: () => void;
  onUpdated: () => void;
}

export default function ModifyUserPopup({ user, onClose, onUpdated }: ModifyUserProps) {
  const [formData, setFormData] = useState<User>(user);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/users/updateUser/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tel: Number(formData.tel) }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Utilisateur modifié avec succès !");
        setTimeout(() => {
          onUpdated(); // rafraîchir liste
          onClose();   // fermer popup
        }, 1000);
      } else {
        setMessage(`❌ ${result.message || "Erreur lors de la modification."}`);
      }
    } catch {
      setMessage("❌ Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl w-full max-w-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Modifier utilisateur
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>

        {message && (
          <p
            className={`mb-4 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nom d'utilisateur"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />
          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />
          <input
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />
          <input
            name="tel"
            type="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Téléphone"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />
          <input
            name="mail"
            type="email"
            value={formData.mail}
            onChange={handleChange}
            placeholder="Email"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />
          <input
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            placeholder="Entreprise"
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          />

          <select
            name="poste"
            value={formData.poste}
            onChange={handleChange}
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          >
            <option value="employee">Employé</option>
            <option value="marin">Marin</option>
          </select>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 rounded-md dark:bg-transparent dark:text-white"
          >
            <option value="employee">Employé</option>
            <option value="admin">Admin</option>
          </select>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
