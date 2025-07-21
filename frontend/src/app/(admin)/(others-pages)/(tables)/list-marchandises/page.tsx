import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ListeMarchandises from "@/components/marchandises/list_marchandises";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function MarchandisesList() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Marchandises" />
      <div className="space-y-6">
        <ComponentCard title="Liste des Marchandises">
          <ListeMarchandises />
        </ComponentCard>
      </div>
    </div>
  );
}
