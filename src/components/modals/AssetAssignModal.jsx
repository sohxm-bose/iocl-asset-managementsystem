import { useState } from "react";
import Modal from "./Modal";

export default function AssetAssignModal({
  isOpen,
  onClose,
  employees,
  asset,
  onAssign,
}) {
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = () => {
    onAssign(employeeId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Asset"
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-2">
            Asset
          </label>

          <input
            disabled
            value={asset?.assetTag || ""}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-2">
            Employee
          </label>

          <select
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">
              Select Employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
              >
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          Assign
        </button>
      </div>
    </Modal>
  );
}