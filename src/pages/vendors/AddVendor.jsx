import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormTextarea from "../../components/forms/FormTextarea";
import FormButton from "../../components/forms/FormButton";

import { createVendor } from "../../services/vendorService";

export default function AddVendor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
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
      await createVendor(formData);
      navigate("/vendors");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Add Vendor">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Vendor Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormInput
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <FormTextarea
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <FormButton>
          Create Vendor
        </FormButton>
      </form>
    </PageLayout>
  );
}