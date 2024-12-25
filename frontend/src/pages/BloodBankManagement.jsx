import React, { useState } from 'react';

const BloodBankManagement = () => {
  const [stockLevels, setStockLevels] = useState([
    { type: 'Whole Blood', level: 40, minLevel: 50 },
    { type: 'Platelets', level: 8, minLevel: 10 },
    { type: 'Plasma', level: 60, minLevel: 40 },
  ]);

  const [formData, setFormData] = useState({
    unitNo: '',
    donationDate: '',
    donationType: 'Whole Blood',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Donation:', formData);
  
    setStockLevels((prevLevels) =>
      prevLevels.map((component) =>
        component.type === formData.donationType
          ? { ...component, level: component.level + 1 }
          : component
      )
    );
  
    setFormData({ unitNo: '', donationDate: '', donationType: 'Whole Blood' });
  };
  

  const handleNotifyDonors = (type) => {
    alert(`Notifying donors for ${type}`);
  };

  const handleRequestCamp = (type) => {
    alert(`Requesting donation camp for ${type}`);
  };

  const alerts = stockLevels.filter((item) => item.level < item.minLevel);

  return (
    <div className="bg-gray-100 w-screen  flex flex-col items-center">
      {/* Dashboard Section */}
      <section className="bg-[#E63946] text-white  text-center py-16 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Blood Component Stock Levels</h1>
        <p className="mt-4 text-xl">Keep track of blood components and ensure adequate stock.</p>
      </section>

      {/* Stock Levels */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-[#E63946] mb-6 text-center">Current Stock Levels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {stockLevels.map((component, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg text-center shadow-md transform transition duration-300 hover:scale-105 mx-auto ${
                component.level < 10
                  ? 'bg-[#C81E1E] text-white'
                  : component.level < 50
                  ? 'bg-[#FF6F61] text-black'
                  : 'bg-[#FF9F91] text-white'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{component.type}</h3>
              <p className="text-lg">Stock: {component.level} units</p>
              <p className="text-sm">Min. Level: {component.minLevel} units</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Donation Form */}
      <form
        className="bg-white shadow-lg rounded-lg p-6 mt-8 w-full max-w-4xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-[#E63946] mb-6 text-center">Add Donation Record</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit Number</label>
            <input
              type="text"
              name="unitNo"
              value={formData.unitNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E63946]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Donation</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E63946]"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type of Donation</label>
          <select
            name="donationType"
            value={formData.donationType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E63946]"
          >
            <option>Whole Blood</option>
            <option>RBC</option>
            <option>Platelet</option>
            <option>Plasma</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#E63946] text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
        >
          Submit
        </button>
      </form>

      {/* Stock Alerts */}
      <div className="bg-gray-100 py-16 px-6 mt-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-[#E63946] text-center mb-6">Stock Alerts</h2>
        {alerts.length > 0 ? (
          <ul className="space-y-6">
            {alerts.map((alert, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-6 border rounded-lg bg-white shadow-md"
              >
                <div>
                  <p className="text-xl font-bold text-gray-800">{alert.type}</p>
                  <p className="text-sm text-gray-600">Current Stock: {alert.level} units</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500"
                    onClick={() => handleNotifyDonors(alert.type)}
                  >
                    ✉ Notify Donors
                  </button>
                  <button
                    className="bg-[#E63946] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
                    onClick={() => handleRequestCamp(alert.type)}
                  >
                    🏕 Request Camp
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No alerts to show.</p>
        )}
      </div>
    </div>
  );
};

export default BloodBankManagement;
