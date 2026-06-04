import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import { getLocation } from "../../services/locationService";

export default function LocationDetails() {
  const { id } = useParams();

  const [location, setLocation] =
    useState(null);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      const response =
        await getLocation(id);

      setLocation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!location) {
    return (
      <PageLayout title="Location Details">
        Loading...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Location Details">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard
            label="Location Name"
            value={location.name}
          />

          <InfoCard
            label="Building"
            value={location.building}
          />

          <InfoCard
            label="Floor"
            value={location.floor}
          />

          <InfoCard
            label="City"
            value={location.city}
          />
        </div>
      </div>
    </PageLayout>
  );
}

function InfoCard({
  label,
  value,
}) {
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