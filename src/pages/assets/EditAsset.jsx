import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import FormDate from "../../components/forms/FormDate";
import FormButton from "../../components/forms/FormButton";

import {
  getAsset,
  updateAsset,
} from "../../services/assetService";

export default function EditAsset() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {
    try {
      const response = await getAsset(id);

      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

      await updateAsset(id, formData);

      navigate("/assets");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Edit Asset">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="Asset Tag"
            name="assetTag"
            value={formData.assetTag || ""}
            onChange={handleChange}
          />

          <FormInput
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer || ""}
            onChange={handleChange}
          />

          <FormInput
            label="Model"
            name="model"
            value={formData.model || ""}
            onChange={handleChange}
          />

          <FormSelect
            label="Status"
            name="status"
            value={formData.status || ""}
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
          Update Asset
        </FormButton>
      </form>
    </PageLayout>
  );
}