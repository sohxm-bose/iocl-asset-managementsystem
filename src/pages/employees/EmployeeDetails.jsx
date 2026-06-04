import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import { getEmployee } from "../../services/employeeService";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const res =
      await getEmployee(id);

    setEmployee(res.data);
  };

  if (!employee)
    return (
      <PageLayout title="Employee">
        Loading...
      </PageLayout>
    );

  return (
    <PageLayout title="Employee Details">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold">
          {employee.name}
        </h2>

        <p>
          {employee.department}
        </p>

        <p>{employee.email}</p>
      </div>
    </PageLayout>
  );
}