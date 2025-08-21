import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Modifier from "@/components/users/modifier_user";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CONTYFIND",
  description:
    "CONTYFIND",
};

export default function ModifierUserForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div className="space-y-6">
        <ComponentCard title="Modifier">
          <Modifier />
        </ComponentCard>
      </div>
    </div>
  );
}
