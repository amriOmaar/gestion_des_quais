import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AjouterMarchandises from "@/components/marchandises/add_marchandises";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function AddMarchandisesForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Marchandises" />
      <div className="space-y-6">
        <ComponentCard title="Ajouter marchandise">
          <AjouterMarchandises />
        </ComponentCard>
      </div>
    </div>
  );
}
