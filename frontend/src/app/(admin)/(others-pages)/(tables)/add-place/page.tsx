import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AjouterPlace from "@/components/places/add_place";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function AddPlace() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Places" />
      <div className="space-y-6">
        <ComponentCard title="Ajouter place">
          <AjouterPlace />
        </ComponentCard>
      </div>
    </div>
  );
}
