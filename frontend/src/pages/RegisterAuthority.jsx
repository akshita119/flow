import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAuthority() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !level || !email || !mobile || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!["admin", "supervisor", "manager", "staff"].includes(level)) {
      setError("Invalid level. Choose from admin, supervisor, manager, or staff.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Mobile number must be a valid 10-digit number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      // API call for authority registration
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/auth/register/authority`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          level,
          email,
          mobile,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register the authority. Please try again.");
      }

      setSuccess(true);
      setError("");
      alert("Authority registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-16">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Register as Authority
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Registration successful!
          </p>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="level" className="block text-gray-700">
              Authority Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Level</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter 10-digit mobile number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-3 px-6 rounded-lg w-full hover:bg-red-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterAuthority;
