import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";
import DataTable from "../../components/tables/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

export default function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "name", label: "Name" },
    { key: "employeeCode", label: "Employee Code" },
    { key: "department", label: "Department" },
    { key: "email", label: "Email" },
  ];

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employee) => {
    await deleteEmployee(employee.id);
    loadEmployees();
  };

  return (
    <PageLayout title="Employees">
      <div className="mb-4">
        <button
          onClick={() =>
            navigate("/employees/new")
          }
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={employees}
          onView={(e) =>
            navigate(`/employees/${e.id}`)
          }
          onEdit={(e) =>
            navigate(`/employees/${e.id}/edit`)
          }
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}