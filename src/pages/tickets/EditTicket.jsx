import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormTextarea from "../../components/forms/FormTextarea";
import FormSelect from "../../components/forms/FormSelect";
import FormButton from "../../components/forms/FormButton";

import {
  getTicket,
  updateTicket,
} from "../../services/ticketService";

export default function EditTicket() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    const response =
      await getTicket(id);

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

    await updateTicket(
      id,
      formData
    );

    navigate("/tickets");
  };

  return (
    <PageLayout title="Edit Ticket">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />

        <FormTextarea
          label="Description"
          name="description"
          value={
            formData.description || ""
          }
          onChange={handleChange}
        />

        <FormSelect
          label="Status"
          name="status"
          value={
            formData.status || "OPEN"
          }
          onChange={handleChange}
          options={[
            {
              label: "Open",
              value: "OPEN",
            },
            {
              label: "In Progress",
              value: "IN_PROGRESS",
            },
            {
              label: "Resolved",
              value: "RESOLVED",
            },
            {
              label: "Closed",
              value: "CLOSED",
            },
          ]}
        />

        <FormSelect
          label="Priority"
          name="priority"
          value={
            formData.priority || "MEDIUM"
          }
          onChange={handleChange}
          options={[
            {
              label: "Low",
              value: "LOW",
            },
            {
              label: "Medium",
              value: "MEDIUM",
            },
            {
              label: "High",
              value: "HIGH",
            },
            {
              label: "Critical",
              value: "CRITICAL",
            },
          ]}
        />

        <FormButton>
          Update Ticket
        </FormButton>
      </form>
    </PageLayout>
  );
}