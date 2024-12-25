import React, { useState, useEffect } from 'react';

function BookAppointment() {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hospitals, setHospitals] = useState([]);

  // Fetching hospital data from the API
  useEffect(() => {
    const fetchHospitals = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/api/request/hospitals`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setHospitals(data);
        } else {
          console.error("Unexpected hospital data:", data);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setErrorMessage('Failed to fetch hospital data. Please try again later.');
      }
    };

    fetchHospitals();
  }, []);

  // Generate 24 one-hour time slots (in 24-hour format)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}` : i;
    return `${hour}:00 - ${hour}:59`;
  });

  // Get today's date in yyyy-mm-dd format for date validation
  const today = new Date().toISOString().split('T')[0];

  // Validate if the selected date is in the past
  const isDateInPast = (date) => {
    const selectedDateObj = new Date(date);
    return selectedDateObj < new Date(today);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHospital || !selectedDate || !selectedTimeSlot) {
      setErrorMessage('Please select all fields: Hospital, Date, and Time Slot.');
      return;
    }

    if (isDateInPast(selectedDate)) {
      setErrorMessage('The selected date is in the past. Please select a valid date.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('/api/request/hospitals/me/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          donorId: localStorage.getItem('donorId'),
          hospitalId: selectedHospital,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment booked successfully!');
      } else {
        setErrorMessage(data.error || 'Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12">
      <section className="bg-[#E63946] text-white py-10 px-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Book an Appointment</h1>
        <p className="text-center text-lg mt-2">Select a hospital, date, and time slot to book your appointment.</p>
      </section>

      <section className="mt-8 bg-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#E63946] mb-4">Appointment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Dropdown */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="hospital">Select Hospital</label>
            <select
              id="hospital"
              name="hospital"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              required
            >
              <option value="">Select a Hospital</option>
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital._id["$oid"]}>
                  {hospital.name}, {hospital.address}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="date">Select Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today} // Restricts the date picker to today or future dates
              required
            />
          </div>

          {/* Time Slot Dropdown */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700" htmlFor="timeSlot">Select Time Slot</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              required
            >
              <option value="">Select a Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 font-semibold mt-4">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#E63946] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#d52c3c]"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BookAppointment;
