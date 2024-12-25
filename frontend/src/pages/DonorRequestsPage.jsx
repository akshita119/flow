import React, { useEffect, useState } from 'react';

function DonorRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch donor requests from the backend API
    fetch('/api/donor-requests')
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching donor requests:', error));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="bg-[#E63946] text-white text-center py-16">
        <h1 className="text-4xl font-bold">Donor Slot Booking Requests</h1>
        <p className="mt-4 text-xl">
          Manage and view all donor slot requests here.
        </p>
      </section>

      {/* Donor Requests Table */}
      <section className="text-center py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-[#E63946] mb-8">Donor Requests</h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#E63946] text-white">
                <th className="px-4 py-2 text-left">Donor Name</th>
                <th className="px-4 py-2 text-left">Slot Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request.request_id} className="border-b">
                    <td className="px-4 py-2">{request.donor_name}</td>
                    <td className="px-4 py-2">
                      {new Date(request.slot_time).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{request.status}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleApprove(request.request_id)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                        onClick={() => handleReject(request.request_id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    No requests available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  // Handle Approve Action
  function handleApprove(requestId) {
    fetch(`/api/donor-requests/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.request_id === requestId ? { ...request, status: 'approved' } : request
          )
        );
      })
      .catch((error) => console.error('Error approving request:', error));
  }

  // Handle Reject Action
  function handleReject(requestId) {
    fetch(`/api/donor-requests/${requestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'rejected' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.request_id === requestId ? { ...request, status: 'rejected' } : request
          )
        );
      })
      .catch((error) => console.error('Error rejecting request:', error));
  }
}

export default DonorRequestsPage;
