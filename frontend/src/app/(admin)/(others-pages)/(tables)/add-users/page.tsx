import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Ajouter from "@/components/users/add_user";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function AddUserForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div className="space-y-6">
        <ComponentCard title="Ajouter">
          <Ajouter />
        </ComponentCard>
      </div>
    </div>
  );
}
