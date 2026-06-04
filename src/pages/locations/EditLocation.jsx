import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";

import FormInput from "../../components/forms/FormInput";
import FormButton from "../../components/forms/FormButton";

import {
  getLocation,
  updateLocation,
} from "../../services/locationService";

export default function EditLocation() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      const response =
        await getLocation(id);

      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
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

    try {
      await updateLocation(
        id,
        formData
      );

      navigate("/locations");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout title="Edit Location">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <FormInput
          label="Location Name"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />

        <FormInput
          label="Building"
          name="building"
          value={
            formData.building || ""
          }
          onChange={handleChange}
        />

        <FormInput
          label="Floor"
          name="floor"
          value={formData.floor || ""}
          onChange={handleChange}
        />

        <FormInput
          label="City"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
        />

        <FormButton>
          Update Location
        </FormButton>
      </form>
    </PageLayout>
  );
}