import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Liste from "@/components/users/users_list";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function UsersList() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div className="space-y-6">
        <ComponentCard title="Liste des utilisateurs">
          <Liste />
        </ComponentCard>
      </div>
    </div>
  );
}
