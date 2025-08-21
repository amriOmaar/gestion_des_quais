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
import Badge from "../ui/badge/Badge";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import ModifyUserPopup from "./modifier_user";

interface Employee {
  _id: string;
  username: string;
  nom: string;
  prenom: string;
  tel: number;
  mail: string;
  entreprise: string;
  poste: string;
  role: string;
}

export default function UsersList() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedUser, setSelectedUser] = useState<Employee | null>(null);

  const fetchUsers = () => {
    fetch("http://localhost:5000/users/getAllUsers")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des employés :", err)
      );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/users/deleteUser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchUsers();
      } else {
        const result = await res.json();
        alert(result.message || "Erreur lors de la suppression.");
      }
    } catch {
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Utilisateurs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Liste des utilisateurs
          </p>
        </div>
        <button
          onClick={() => router.push("/add-users")}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1100px]">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-white/[0.05]">
                <TableRow>
                  {[
                    "Nom & Prénom",
                    "Username",
                    "Téléphone",
                    "Email",
                    "Entreprise",
                    "Poste",
                    "Rôle",
                    "",
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
                {employees.map((emp) => (
                  <TableRow
                    key={emp._id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition"
                  >
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-white text-center">
                      {emp.nom} {emp.prenom}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {emp.username}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {emp.tel}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {emp.mail}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {emp.entreprise}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      {emp.poste}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
                      <Badge
                        size="sm"
                        color={
                          emp.role === "admin"
                            ? "success"
                            : emp.role === "employee"
                            ? "warning"
                            : "error"
                        }
                      >
                        {emp.role}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-6 py-4 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => setSelectedUser(emp)}
                        className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(emp._id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Popup modification */}
      {selectedUser && (
        <ModifyUserPopup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdated={fetchUsers}
        />
      )}
    </div>
  );
}