"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nom: "",
    prenom: "",
    tel: "",
    mail: "",
    entreprise: "",
    poste: "employee",
    role: "employee",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      username,
      password,
      nom,
      prenom,
      tel,
      mail,
      entreprise,
    } = formData;

    // Validation simple : champs obligatoires non vides
    if (
      !username.trim() ||
      !password.trim() ||
      !nom.trim() ||
      !prenom.trim() ||
      !tel.trim() ||
      !mail.trim() ||
      !entreprise.trim()
    ) {
      setMessage("❌ Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tel: Number(formData.tel) }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Utilisateur ajouté avec succès !");
        setTimeout(() => {
          router.push("/list-users");
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
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Ajouter un nouvel utilisateur
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

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate
      >
        <input
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="tel"
          type="tel"
          placeholder="Téléphone"
          value={formData.tel}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="mail"
          type="email"
          placeholder="Email"
          value={formData.mail}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />
        <input
          name="entreprise"
          placeholder="Entreprise"
          value={formData.entreprise}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
          required
        />

        <select
          name="poste"
          value={formData.poste}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        >
          <option value="employee">Employé</option>
          <option value="marin">Marin</option>
        </select>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border border-gray-300 dark:border-white/[0.1] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:text-white"
        >
          <option value="employee">Employé</option>
          <option value="admin">Admin</option>
        </select>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 justify-center">
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