import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormButton from "../../components/forms/FormButton";

import {
  getEmployee,
  updateEmployee,
} from "../../services/employeeService";

export default function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const res =
      await getEmployee(id);

    setFormData(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateEmployee(
      id,
      formData
    );

    navigate("/employees");
  };

  return (
    <PageLayout title="Edit Employee">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Name"
          name="name"
          value={
            formData.name || ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <FormButton>
          Update Employee
        </FormButton>
      </form>
    </PageLayout>
  );
}