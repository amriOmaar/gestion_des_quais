"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PlusCircle } from "lucide-react";

interface Marin {
  nom: string;
  prenom: string;
}

interface Bateau {
  _id: string;
  nom: string;
  numero: number;
  adresse: string;
  pays: string;
  marque: string;
  date_entre: string;
  date_sortie: string;
  marin?: Marin;
}

export default function ListBateau() {
  const router = useRouter();
  const [bateaux, setBateaux] = useState<Bateau[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/bateaux/getAllBateaux")
      .then((res) => res.json())
      .then((data) => setBateaux(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des bateaux :", err)
      );
  }, []);

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Bateaux
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Liste des bateaux enregistrés
          </p>
        </div>
        <button
          onClick={() => router.push("/add-bateau")}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-white/[0.05]">
                <TableRow>
                  {[
                    "Nom",
                    "Numéro",
                    "Adresse",
                    "Pays",
                    "Marque",
                    "Date Entrée",
                    "Date Sortie",
                    "Marin",
                  ].map((col) => (
                    <TableCell
                      key={col}
                      isHeader
                      className="py-4 px-6 font-semibold text-gray-600 dark:text-white text-center"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {bateaux.map((b) => (
                  <TableRow
                    key={b._id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
                  >
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-white text-center">{b.nom}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">{b.numero}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">{b.adresse}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">{b.pays}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">{b.marque}</TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {new Date(b.date_entre).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {b.date_sortie
                        ? new Date(b.date_sortie).toLocaleDateString("fr-FR")
                        : "-"}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center">
  {b.marin ? (
    <span className="inline-block rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-green-700/20 dark:text-green-300">
      {b.marin.nom} {b.marin.prenom}
    </span>
  ) : (
    <span className="inline-block rounded-full bg-red-100 text-red-600 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-red-700/20 dark:text-red-300">
      Aucun
    </span>
  )}
</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
