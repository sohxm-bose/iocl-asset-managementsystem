import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";
import DataTable from "../../components/tables/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  getVendors,
  deleteVendor,
} from "../../services/vendorService";

export default function VendorList() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      key: "name",
      label: "Vendor Name",
    },
    {
      key: "contactPerson",
      label: "Contact Person",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
  ];

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const response = await getVendors();
      setVendors(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vendor) => {
    try {
      await deleteVendor(vendor.id);
      loadVendors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Vendors">
      <div className="mb-4">
        <button
          onClick={() => navigate("/vendors/new")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add Vendor
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={vendors}
          onView={(vendor) =>
            navigate(`/vendors/${vendor.id}`)
          }
          onEdit={(vendor) =>
            navigate(`/vendors/${vendor.id}/edit`)
          }
          onDelete={handleDelete}
        />
      )}
    </PageLayout>
  );
}