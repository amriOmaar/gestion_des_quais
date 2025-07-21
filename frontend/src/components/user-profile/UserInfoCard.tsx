"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface DecodedToken {
  _id: string;
  username: string;
  nom: string;
  prenom: string;
  tel: string;
  entreprise: string;
  poste: string;
  role: string;
  exp: number;
  iat: number;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
      }
    }
  }, []);

  const handleSave = () => {
    console.log("Données sauvegardées");
    closeModal();
  };

  if (!user) {
    return <p className="text-gray-500">Chargement du profil...</p>;
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Informations personnelles
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Nom</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.nom}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Prénom</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.prenom}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Nom utilisateur</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.username}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Téléphone</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.tel}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Entreprise</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.entreprise}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Poste</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.poste}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Rôle</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{user.role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          Modifier
        </button>
      </div>

      {/* Fenêtre modale */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Modifier les informations personnelles
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Mettez à jour vos données si nécessaire.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nom</Label>
                  <Input type="text" defaultValue={user.nom} />
                </div>
                <div>
                  <Label>Prénom</Label>
                  <Input type="text" defaultValue={user.prenom} />
                </div>
                <div>
                  <Label>Nom utilisateur</Label>
                  <Input type="text" defaultValue={user.username} />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input type="text" defaultValue={user.tel} />
                </div>
                <div>
                  <Label>Entreprise</Label>
                  <Input type="text" defaultValue={user.entreprise} />
                </div>
                <div>
                  <Label>Poste</Label>
                  <Input type="text" defaultValue={user.poste} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>Fermer</Button>
              <Button size="sm" onClick={handleSave}>Enregistrer</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}