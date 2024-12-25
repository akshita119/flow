import { useState, useEffect } from "react";
import axios from "axios";

const UpdateDonor = () => {
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch donor data when the email is entered and component mounts
  useEffect(() => {
    if (email) {
      const fetchDonorData = async () => {
        try {
          const response = await axios.post(`/api/donation/${email}`);
          const donor = response.data;

          setBloodType(donor.bloodType || "");
          setAge(donor.age || "");
          setName(donor.name || "");
          setDonationDate(donor.lastDonationDate || "");
          setError(""); // Clear any previous errors
        } catch (err) {
          setError(
            "Error fetching donor data: " +
              (err.response?.data?.message || err.message)
          );
        }
      };

      fetchDonorData();
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !donationDate) {
      setError("Please provide email and donation date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put("/api/donation/update-donation", {
        email,
        bloodType,
        age,
        name,
        donationDate,
      });
      setMessage(response.data.message);
      setError(""); // Clear any previous error

      // Clear form fields after successful submission
      setEmail("");
      setBloodType("");
      setAge("");
      setName("");
      setDonationDate("");
    } catch (err) {
      setMessage(""); // Clear any previous message
      setError(
        "Error updating donor data: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Update Last Donation Date</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Blood Type:</label>
          <input
            type="text"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Last Donation Date:
          </label>
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
      {loading && <p className="text-gray-700">Loading...</p>}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UpdateDonor;
