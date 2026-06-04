import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormButton from "../../components/forms/FormButton";

import { createLocation } from "../../services/locationService";

export default function AddLocation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    building: "",
    floor: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLocation(formData);

      navigate("/locations");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Add Location">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Location Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormInput
          label="Building"
          name="building"
          value={formData.building}
          onChange={handleChange}
        />

        <FormInput
          label="Floor"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
        />

        <FormInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <FormButton>
          Create Location
        </FormButton>
      </form>
    </PageLayout>
  );
}