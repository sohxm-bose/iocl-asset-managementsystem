import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import FormTextarea from "../../components/forms/FormTextarea";
import FormButton from "../../components/forms/FormButton";

import { createTicket } from "../../services/ticketService";

export default function AddTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "MEDIUM",
    status: "OPEN",
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
      await createTicket(formData);
      navigate("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Create Ticket">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <FormInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <FormSelect
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={[
            { label: "Low", value: "LOW" },
            { label: "Medium", value: "MEDIUM" },
            { label: "High", value: "HIGH" },
            { label: "Critical", value: "CRITICAL" },
          ]}
        />

        <FormButton>
          Create Ticket
        </FormButton>
      </form>
    </PageLayout>
  );
}