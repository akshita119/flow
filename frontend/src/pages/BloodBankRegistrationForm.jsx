import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function BloodBankRegistrationForm() {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    DMHORegNo: "",
    email: "",
    password: "",
    mobile: "",
    address: {
      street: "",
      city: "",
      pincode: "",
      state: "",
    },
    componentSeparationAvailable: "",
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
      
      !formData.email ||
      !formData.password ||
      !formData.mobile ||
      !formData.name ||
      !formData.DMHORegNo ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.pincode ||
      !formData.address.state ||
      !formData.componentSeparationAvailable
    ) {
      setError("All fields are required!");
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

  const registerBloodBank = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/bloodBank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register Blood Bank");
      }
      navigate("/login-bloodBank");
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
          Join the cause and start saving lives.
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
          <InputField label="Name of Blood Bank" name="name" value={formData.name} handleChange={handleChange} />
          <InputField label="DMHO Registration Number" name="DMHORegNo" value={formData.DMHORegNo} handleChange={handleChange} />
          <InputField label="Is component separation available ?" name="componentSeparationAvailable" value={formData.componentSeparationAvailable} handleChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} handleChange={handleChange} />
          <InputField label="Password" name="password" value={formData.password} handleChange={handleChange} type="password" />

          {/* Additional Fields */}
          <InputField label="Mobile" name="mobile" value={formData.mobile} handleChange={handleChange} />

          {/* Address Fields */}
          <InputField label="Street" name="address.street" value={formData.address.street} handleChange={handleChange} />
          <InputField label="City" name="address.city" value={formData.address.city} handleChange={handleChange} />
          <InputField label="Pincode" name="address.pincode" value={formData.address.pincode} handleChange={handleChange} />
          <InputField label="State" name="address.state" value={formData.address.state} handleChange={handleChange} />

          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#E63946] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#D62828]"
            >
              Register as Blood Bank
            </button>
          </div>
        </form>
      </section>

      <section className="text-center py-8 bg-gray-100">
        <p className="text-lg text-gray-700">
          Already have an account?{" "}
          <Link to="/login-bloodBank" className="text-[#E63946] font-semibold">
            Login as Blood Bank
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
        placeholder={` ${label}`}
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

export default BloodBankRegistrationForm;
