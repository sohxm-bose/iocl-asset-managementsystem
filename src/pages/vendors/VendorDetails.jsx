import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import { getVendor } from "../../services/vendorService";

export default function VendorDetails() {
  const { id } = useParams();

  const [vendor, setVendor] =
    useState(null);

  useEffect(() => {
    loadVendor();
  }, []);

  const loadVendor = async () => {
    const response =
      await getVendor(id);

    setVendor(response.data);
  };

  if (!vendor) {
    return (
      <PageLayout title="Vendor Details">
        Loading...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Vendor Details">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard
            label="Vendor Name"
            value={vendor.name}
          />

          <InfoCard
            label="Contact Person"
            value={vendor.contactPerson}
          />

          <InfoCard
            label="Email"
            value={vendor.email}
          />

          <InfoCard
            label="Phone"
            value={vendor.phone}
          />

          <InfoCard
            label="Address"
            value={vendor.address}
          />
        </div>
      </div>
    </PageLayout>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="font-semibold mt-1">
        {value || "-"}
      </h3>
    </div>
  );
}