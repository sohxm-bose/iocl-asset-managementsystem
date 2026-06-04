import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import { getAsset } from "../../services/assetService";

export default function AssetDetails() {
  const { id } = useParams();

  const [asset, setAsset] = useState(null);

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {
    try {
      const response = await getAsset(id);

      setAsset(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!asset) {
    return (
      <PageLayout title="Asset Details">
        Loading...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Asset Details">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            label="Asset Tag"
            value={asset.assetTag}
          />

          <InfoCard
            label="Manufacturer"
            value={asset.manufacturer}
          />

          <InfoCard
            label="Model"
            value={asset.model}
          />

          <InfoCard
            label="Category"
            value={asset.category}
          />

          <InfoCard
            label="Status"
            value={asset.status}
          />

          <InfoCard
            label="Purchase Date"
            value={asset.purchaseDate}
          />

          <InfoCard
            label="Warranty Expiry"
            value={asset.warrantyExpiry}
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