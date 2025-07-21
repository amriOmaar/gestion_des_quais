import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ListePlace from "@/components/places/PlacesBoard";
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
      <PageBreadcrumb pageTitle="Place" />
      <div className="space-y-6">
        <ComponentCard title="Liste place">
          <ListePlace />
        </ComponentCard>
      </div>
    </div>
  );
}
