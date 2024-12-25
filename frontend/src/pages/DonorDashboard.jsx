import React from "react";

function DonorDashboard() {
  // Dynamic data for the donor (replace with API data in production)
  const donorInfo = {
    name: "Akshita Kumari",
    email: "akshita@example.com",
    mobile: "+91 9876543210",
    address: "123, NIT Kurukshetra, Haryana, India",
    dob: "15th August 2001",
    bloodGroup: "O+",
    totalDonations: 3,
    lastDonation: "1st June 2024",
    upcomingCamp: {
      date: "15th January 2025",
      location: "City Hospital, Chandigarh",
    },
    donations: [
      { date: "2024-06-01", location: "City Hospital, Kurukshetra", status: "Completed" },
      { date: "2023-12-15", location: "Apollo Clinic, Delhi", status: "Completed" },
      { date: "2023-07-21", location: "Metro Blood Bank, Jaipur", status: "Completed" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white py-10 px-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Donor Dashboard</h1>
        <p className="text-center text-lg mt-2">Welcome back, {donorInfo.name}!</p>
      </section>

      {/* Appreciation Section */}
      <section className="mt-8 bg-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#E63946] text-center">
          Thank You for Your Contributions!
        </h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          You have made{" "}
          <span className="font-bold text-[#E63946]">{donorInfo.totalDonations}</span>{" "}
          {donorInfo.totalDonations === 1 ? "life-saving donation" : "life-saving donations"} so far.
        </p>
        <p className="mt-2 text-lg text-gray-700 text-center">
          Your generosity is deeply appreciated. Keep saving lives!
        </p>
      </section>

      {/* Personal Information Section */}
      <section className="mt-8 bg-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#E63946] mb-4">Your Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p><strong>Name:</strong> {donorInfo.name}</p>
          <p><strong>Email:</strong> {donorInfo.email}</p>
          <p><strong>Mobile:</strong> {donorInfo.mobile}</p>
          <p><strong>Address:</strong> {donorInfo.address}</p>
          <p><strong>Date of Birth:</strong> {donorInfo.dob}</p>
          <p><strong>Blood Group:</strong> {donorInfo.bloodGroup}</p>
        </div>
      </section>

      {/* Last Donation and Upcoming Camp Section */}
      {/* Last Donation and Upcoming Camp Section */}
{donorInfo.donations.length > 0 && (
  <section className="mt-8 bg-white py-8 px-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-[#E63946] mb-4">Donation Summary</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <p>
        <strong>Last Donation:</strong> {donorInfo.lastDonation}
      </p>
      <p>
        <strong>Upcoming Camp:</strong>{" "}
        {donorInfo.upcomingCamp.date} at {donorInfo.upcomingCamp.location}
      </p>
    </div>
  </section>
)}


      {/* Donation Records Section */}
      {/* Donation Records Section */}
<section className="mt-8 bg-white py-8 px-6 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-[#E63946] mb-4">Previous Donations</h2>
  <div className="overflow-x-auto">
    {donorInfo.donations.length > 0 ? (
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border-b-2 border-gray-300">Date</th>
            <th className="p-3 border-b-2 border-gray-300">Location</th>
            <th className="p-3 border-b-2 border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {donorInfo.donations.map((donation, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border-b">{donation.date}</td>
              <td className="p-3 border-b">{donation.location}</td>
              <td className="p-3 border-b">{donation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-lg text-gray-700 text-center">
        You haven't donated yet.
      </p>
    )}
  </div>
</section>

    </div>
  );
}

export default DonorDashboard;
