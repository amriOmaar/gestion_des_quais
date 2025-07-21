import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AjouterBateau from "@/components/bateaux/add_bateau";
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
      <PageBreadcrumb pageTitle="Bateaux" />
      <div className="space-y-6">
        <ComponentCard title="Ajouter">
          <AjouterBateau />
        </ComponentCard>
      </div>
    </div>
  );
}
