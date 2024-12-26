import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function DonorRegistrationForm() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    ABHA: "",
    email: "",
    password: "",
    mobile: "",
    name: "",
    age: "",
    dob: "",
    fathersName: "",
    gender: "",
    address: {
      street: "",
      city: "",
      pincode: "",
      state: "",
    },
    bloodGroup: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (
      !formData.ABHA ||
      !formData.email ||
      !formData.password ||
      !formData.mobile ||
      !formData.name ||
      !formData.age ||
      !formData.dob ||
      !formData.fathersName ||
      !formData.gender ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.pincode ||
      !formData.address.state ||
      !formData.bloodGroup
    ) {
      setError("All fields are required!");
      return false;
    }
    if (isNaN(formData.ABHA)) {
      setError("ABHA must be a valid number!");
      return false;
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      setError("Age must be a positive number!");
      return false;
    }
    if (isNaN(formData.mobile) || formData.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address!");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return false;
    }
    if (isNaN(formData.address.pincode) || formData.address.pincode.length !== 6) {
      setError("Pincode must be a 6-digit number!");
      return false;
    }
    return true;
  };

  const registerDonor = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/donor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register donor");
      }
      navigate("/login-donor");
      setSuccess(true);
      setError("");
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      registerDonor();
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
        <h1 className="text-4xl font-bold">Register as a Donor</h1>
        <p className="mt-4 text-xl">
          Join the cause and start saving lives by donating blood.
        </p>
      </section>

      <section className="bg-white py-16 px-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-[#E63946] mb-6">
            Donor Registration Form
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Fields for ABHA, Email, Password */}
          <InputField label="ABHA Number" name="ABHA" value={formData.ABHA} handleChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} handleChange={handleChange} />
          <InputField label="Password" name="password" value={formData.password} handleChange={handleChange} type="password" />

          {/* Additional Fields */}
          <InputField label="Mobile" name="mobile" value={formData.mobile} handleChange={handleChange} />
          <InputField label="Name" name="name" value={formData.name} handleChange={handleChange} />
          <InputField label="Age" name="age" value={formData.age} handleChange={handleChange} />
          <InputField label="Date of Birth" name="dob" value={formData.dob} handleChange={handleChange} type="date" />
          <InputField label="Father's Name" name="fathersName" value={formData.fathersName} handleChange={handleChange} />

          {/* Address Fields */}
          <InputField label="Street" name="address.street" value={formData.address.street} handleChange={handleChange} />
          <InputField label="City" name="address.city" value={formData.address.city} handleChange={handleChange} />
          <InputField label="Pincode" name="address.pincode" value={formData.address.pincode} handleChange={handleChange} />
          <InputField label="State" name="address.state" value={formData.address.state} handleChange={handleChange} />

          {/* Blood Group and Gender */}
          <DropdownField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} handleChange={handleChange} options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
          <DropdownField label="Gender" name="gender" value={formData.gender} handleChange={handleChange} options={["Male", "Female", "Others"]} />

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#E63946] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#D62828]"
            >
              Register as Donor
            </button>
          </div>
        </form>
      </section>

      <section className="text-center py-8 bg-gray-100">
        <p className="text-lg text-gray-700">
          Already have an account?{" "}
          <Link to="/login-donor" className="text-[#E63946] font-semibold">
            Login as Donor
          </Link>
        </p>
      </section>
    </div>
  );
}

// Reusable InputField Component
function InputField({ label, name, value, handleChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );
}

// Reusable DropdownField Component
function DropdownField({ label, name, value, handleChange, options }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DonorRegistrationForm;
