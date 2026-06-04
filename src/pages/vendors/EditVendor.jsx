import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormTextarea from "../../components/forms/FormTextarea";
import FormButton from "../../components/forms/FormButton";

import {
  getVendor,
  updateVendor,
} from "../../services/vendorService";

export default function EditVendor() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    loadVendor();
  }, []);

  const loadVendor = async () => {
    const response =
      await getVendor(id);

    setFormData(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateVendor(
      id,
      formData
    );

    navigate("/vendors");
  };

  return (
    <PageLayout title="Edit Vendor">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Vendor Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />

        <FormInput
          label="Contact Person"
          name="contactPerson"
          value={
            formData.contactPerson || ""
          }
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <FormTextarea
          label="Address"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
        />

        <FormButton>
          Update Vendor
        </FormButton>
      </form>
    </PageLayout>
  );
}