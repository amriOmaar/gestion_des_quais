"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeIcon, EyeCloseIcon } from "@/icons";


export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      localStorage.setItem("token", data.token);
      router.push("/");

    } catch (err: any) {
      console.error("Erreur de connexion :", err);
      setError(err.message || "Erreur inconnue");
    }
  };

  return (
    
  <div className="">
  <form
    onSubmit={handleLogin}
    className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-20 space-y-6"
  >
    {/* Logo centré */}
    <div className="flex justify-center">
      <img
        src="/images/logo/logo.png"
        width={140}
        height={200}
        alt="Logo de l'entreprise"
      />
    </div>
    <h2 className="text-3xl font-bold text-center text-gray-800">Bienvenue 👋</h2>
    <p className="text-base text-center text-gray-500">Connectez-vous à votre compte</p>

    <div>
      <Label className="mb-2 block text-gray-700 text-lg">
        Nom d'utilisateur <span className="text-red-500">*</span>
      </Label>
      <Input
        placeholder="Entrez votre nom d'utilisateur"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 text-base"
      />
    </div>

    <div>
      <Label className="mb-2 block text-gray-700 text-lg">
        Mot de passe <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 pr-12 p-3 text-base"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
        </span>
      </div>
    </div>

    {error && <p className="text-red-500 text-base text-center">{error}</p>}

    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 text-lg"
    >
      Se connecter
    </Button>

  </form>
</div>



  );
}
