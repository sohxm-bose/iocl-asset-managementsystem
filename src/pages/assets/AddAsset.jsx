import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import FormDate from "../../components/forms/FormDate";
import FormButton from "../../components/forms/FormButton";

import { createAsset } from "../../services/assetService";

export default function AddAsset() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    assetTag: "",
    manufacturer: "",
    model: "",
    category: "",
    purchaseDate: "",
    warrantyExpiry: "",
    status: "AVAILABLE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createAsset(formData);

      navigate("/assets");
    } catch (error) {
      console.error(error);
      alert("Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Add Asset">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="Asset Tag"
            name="assetTag"
            value={formData.assetTag}
            onChange={handleChange}
          />

          <FormInput
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
          />

          <FormInput
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />

          <FormInput
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <FormDate
            label="Purchase Date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />

          <FormDate
            label="Warranty Expiry"
            name="warrantyExpiry"
            value={formData.warrantyExpiry}
            onChange={handleChange}
          />

          <FormSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              {
                label: "Available",
                value: "AVAILABLE",
              },
              {
                label: "Allocated",
                value: "ALLOCATED",
              },
              {
                label: "Repair",
                value: "REPAIR",
              },
              {
                label: "Retired",
                value: "RETIRED",
              },
            ]}
          />
        </div>

        <FormButton loading={loading}>
          Create Asset
        </FormButton>
      </form>
    </PageLayout>
  );
}