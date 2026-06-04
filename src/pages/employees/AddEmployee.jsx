import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormButton from "../../components/forms/FormButton";

import { createEmployee } from "../../services/employeeService";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      employeeCode: "",
      email: "",
      department: "",
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

    await createEmployee(formData);

    navigate("/employees");
  };

  return (
    <PageLayout title="Add Employee">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <FormInput
          label="Employee Code"
          name="employeeCode"
          value={formData.employeeCode}
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <FormButton>
          Create Employee
        </FormButton>
      </form>
    </PageLayout>
  );
}