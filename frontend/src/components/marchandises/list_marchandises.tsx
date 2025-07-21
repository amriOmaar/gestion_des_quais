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

interface Bateau {
  nom: string;
  numero: number;
}

interface Marchandise {
  _id: string;
  conteneur: string;
  description: string;
  bateau?: Bateau;
}

export default function ListMarchandises() {
  const router = useRouter();
  const [marchandises, setMarchandises] = useState<Marchandise[]>([]);

 useEffect(() => {
  fetch("http://localhost:5000/marchandises/getAllMarchandises")
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA REÇUE :", data); // <== ICI
      setMarchandises(data);
    })
    .catch((err) => {
      console.error("Erreur lors du chargement des marchandises :", err);
      setMarchandises([]); // fallback vide
    });
}, []);


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
          onClick={() => router.push("/add-marchandise")}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-white/[0.05]">
                <TableRow>
                  {["Conteneur", "Description", "Nom du Bateau", "Numéro du Bateau"].map((col) => (
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
                {marchandises.map((m) => (
                  <TableRow
                    key={m._id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
                  >
                    <TableCell className="px-6 py-4 text-center text-gray-800 dark:text-white">{m.conteneur}</TableCell>
                    <TableCell className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{m.description}</TableCell>

                                        <TableCell className="px-6 py-4 text-center">
                      {m.bateau?.nom ? (
                        <span className="inline-block rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-green-700/20 dark:text-green-300">
                          {m.bateau?.nom}
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-red-100 text-red-600 px-3 py-1 text-sm font-semibold shadow-sm dark:bg-red-700/20 dark:text-red-300">
                          Aucun
                        </span>
                      )}
                    </TableCell>


                    <TableCell className="px-6 py-4 text-center text-gray-600 dark:text-gray-400">{m.bateau?.numero || "N/A"}</TableCell>
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