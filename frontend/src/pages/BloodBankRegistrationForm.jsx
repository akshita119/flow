import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function BloodBankRegistrationForm() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: "",
    dmhoRegistrationNo: "",
    clinicalEstablishmentsAct: "",
    contactNumber: "",
    extension: "",
    componentSeparationFacility: "",
    storageCapacity: "",
    bloodType: "",
    units: "",
    bloodTransportationFacility: "",
    vehicleType: "",
    vehicleRegistrationNo: "",
    hospitalCode: "",
    licenceNo: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (
      !formData.hospitalName ||
      !formData.dmhoRegistrationNo ||
      !formData.clinicalEstablishmentsAct ||
      !formData.contactNumber ||
      !formData.componentSeparationFacility ||
      !formData.storageCapacity ||
      !formData.bloodType ||
      !formData.units ||
      !formData.bloodTransportationFacility ||
      !formData.vehicleType ||
      !formData.vehicleRegistrationNo ||
      !formData.hospitalCode ||
      !formData.licenceNo
    ) {
      setError("All fields are required!");
      return false;
    }
    if (isNaN(formData.contactNumber) || formData.contactNumber.length < 10) {
      setError("Please enter a valid contact number!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const registerBloodBank = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register/blood-bank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register blood bank");
      }
      navigate("/login-blood-bank");

      setSuccess(true);
      setError("");
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerBloodBank();
    }
  };

  useEffect(() => {
    if (success) {
      // Perform any additional actions on successful registration
    }
  }, [success]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <section className="bg-[#E63946] text-white text-center py-16">
        <h1 className="text-4xl font-bold">Register as a Blood Bank</h1>
        <p className="mt-4 text-xl">
          Join the cause and help save lives by managing blood donations.
        </p>
      </section>

      <section className="bg-white py-16 px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
            Blood Bank Registration Form
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Registration form has been successfully submitted. You will be
              informed by email about acceptance of registration. You can place
              requests immediately after acceptance of registration.
            </p>
          )}

          <div className="mb-4">
            <label
              htmlFor="hospitalName"
              className="block text-lg font-medium text-gray-700"
            >
              Name of Hospital
            </label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter the name of the hospital"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dmhoRegistrationNo"
              className="block text-lg font-medium text-gray-700"
            >
              DMHO Registration No.
            </label>
            <input
              type="text"
              id="dmhoRegistrationNo"
              name="dmhoRegistrationNo"
              value={formData.dmhoRegistrationNo}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter DMHO Registration No."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="clinicalEstablishmentsAct"
              className="block text-lg font-medium text-gray-700"
            >
              Is your hospital registered under Clinical Establishments Act? If yes, Registration No and Date
            </label>
            <input
              type="text"
              id="clinicalEstablishmentsAct"
              name="clinicalEstablishmentsAct"
              value={formData.clinicalEstablishmentsAct}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter details if applicable"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-lg font-medium text-gray-700"
            >
              Contact Number (of Blood Bank)
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter blood bank contact number"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="extension"
              className="block text-lg font-medium text-gray-700"
            >
              Extension (if applicable)
            </label>
            <input
              type="text"
              id="extension"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter extension number"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="componentSeparationFacility"
              className="block text-lg font-medium text-gray-700"
            >
              Component Separation Facility
            </label>
            <input
              type="text"
              id="componentSeparationFacility"
              name="componentSeparationFacility"
              value={formData.componentSeparationFacility}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter component separation facility details"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="storageCapacity"
              className="block text-lg font-medium text-gray-700"
            >
              Storage Capacity Available
            </label>
            <input
              type="text"
              id="storageCapacity"
              name="storageCapacity"
              value={formData.storageCapacity}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter storage capacity details"
            />
          </div>

        

          

          <div className="mb-4">
            <label
              htmlFor="bloodTransportationFacility"
              className="block text-lg font-medium text-gray-700"
            >
              Blood Transportation Facility (if available)
            </label>
            <input
              type="text"
              id="bloodTransportationFacility"
              name="bloodTransportationFacility"
              value={formData.bloodTransportationFacility}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter transportation facility details"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleType"
              className="block text-lg font-medium text-gray-700"
            >
              Type of vehicle
            </label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter vehicle type"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleRegistrationNo"
              className="block text-lg font-medium text-gray-700"
            >
              Vehicle Registration Number
            </label>
            <input
              type="text"
              id="vehicleRegistrationNo"
              name="vehicleRegistrationNo"
              value={formData.vehicleRegistrationNo}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter vehicle registration number"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="hospitalCode"
              className="block text-lg font-medium text-gray-700"
            >
              Hospital Code
            </label>
            <input
              type="text"
              id="hospitalCode"
              name="hospitalCode"
              value={formData.hospitalCode}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter hospital code"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="licenceNo"
              className="block text-lg font-medium text-gray-700"
            >
              Licence for Operating Blood Bank under Drugs Standard Control Organisation
            </label>
            <input
              type="text"
              id="licenceNo"
              name="licenceNo"
              value={formData.licenceNo}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter licence number"
            />
          </div>

          <div className="mb-6 text-center">
            <button
              type="submit"
              className="bg-[#E63946] text-white py-3 px-6 rounded-lg text-xl font-semibold"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BloodBankRegistrationForm;
