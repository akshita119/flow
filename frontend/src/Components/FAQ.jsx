import React, { useState } from 'react';

function FAQ() {
  // State to manage open/closed FAQ sections
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle the visibility of an answer
  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // If clicked on the open question, close it
    } else {
      setOpenIndex(index); // Open the clicked question
    }
  };

  // Array of FAQ items with question and answer
  const faqItems = [
    {
      question: 'Who can donate blood?',
      answer: 'Generally, healthy individuals between the ages of 18 and 65, who weigh at least 50 kg, and have no contraindications are eligible to donate blood.',
    },
    {
      question: 'What are the components of donated blood?',
      answer: (
        <div>
          <p className="mb-4">
            Donated blood is separated into various components to treat specific medical conditions:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Function</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Storage Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Red Blood Cells</td>
                  <td className="px-6 py-4 text-gray-600">Carry oxygen to tissues</td>
                  <td className="px-6 py-4 text-gray-600">Up to 42 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Plasma</td>
                  <td className="px-6 py-4 text-gray-600">Contains clotting factors</td>
                  <td className="px-6 py-4 text-gray-600">Up to 1 year (frozen)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">Platelets</td>
                  <td className="px-6 py-4 text-gray-600">Help in blood clotting</td>
                  <td className="px-6 py-4 text-gray-600">Up to 5 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      question: 'What is blood compatibility?',
      answer: (
        <div>
          <p className="mb-4">
            Blood compatibility depends on blood groups and Rh factors. The following table summarizes who can donate to whom:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Can Donate To</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Can Receive From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">O-</td>
                  <td className="px-6 py-4 text-gray-600">All Blood Groups</td>
                  <td className="px-6 py-4 text-gray-600">O-</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">O+</td>
                  <td className="px-6 py-4 text-gray-600">O+, A+, B+, AB+</td>
                  <td className="px-6 py-4 text-gray-600">O+, O-</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-6 py-4 font-semibold text-gray-800">A-</td>
                  <td className="px-6 py-4 text-gray-600">A-, A+, AB-, AB+</td>
                  <td className="px-6 py-4 text-gray-600">A-, O-</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">A+</td>
                  <td className="px-6 py-4 text-gray-600">A+, AB+</td>
                  <td className="px-6 py-4 text-gray-600">A+, A-, O+, O-</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-6 py-4 font-semibold text-gray-800">B-</td>
                  <td className="px-6 py-4 text-gray-600">B-, B+, AB-, AB+</td>
                  <td className="px-6 py-4 text-gray-600">B-, O-</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">B+</td>
                  <td className="px-6 py-4 text-gray-600">B+, AB+</td>
                  <td className="px-6 py-4 text-gray-600">B+, B-, O+, O-</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="px-6 py-4 font-semibold text-gray-800">AB-</td>
                  <td className="px-6 py-4 text-gray-600">AB-, AB+</td>
                  <td className="px-6 py-4 text-gray-600">AB-, A-, B-, O-</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800">AB+</td>
                  <td className="px-6 py-4 text-gray-600">AB+</td>
                  <td className="px-6 py-4 text-gray-600">All Blood Groups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    
    
    {
      question: 'How to prepare for blood donation?',
      answer: (
        <div>
          <p className="mb-4">
            Follow these guidelines to ensure a smooth donation experience:
          </p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Stay hydrated by drinking plenty of water before donating.</li>
            <li>Eat a balanced meal rich in iron.</li>
            <li>Get a good night’s sleep prior to your donation.</li>
          </ul>
        </div>
      ),
    },
    
    {
      question: 'How often can I donate blood?',
      answer: 'You can donate whole blood once every 56 days (8 weeks). Plasma donations can be made every 28 days.',
    },
    {
      question: 'What happens to the blood after donation?',
      answer: 'The donated blood is tested, processed into different components (red blood cells, plasma, platelets), and distributed to hospitals based on patient needs.',
    },
    {
      question: 'Is blood donation safe?',
      answer: 'Yes, blood donation is a safe procedure. All equipment used during the donation process is sterile and single-use to ensure safety.',
    },
    {
      question: 'How long does it take to donate blood?',
      answer: 'The entire blood donation process usually takes about 30 minutes to 1 hour, including the time to register and rest afterward.',
    },
    {
      question: 'Can I donate blood if I am on medication?',
      answer: 'It depends on the medication. Certain medications may affect your eligibility to donate blood. It’s best to consult with a healthcare provider or blood donation center for guidance.',
    },
    {
      question: 'What is the minimum age to donate blood?',
      answer: 'The minimum age to donate blood is typically 18 years old. However, some blood banks may allow donations starting at 16 with parental consent.',
    },
    {
      question: 'Can I donate blood if I have tattoos or piercings?',
      answer: 'Yes, you can donate blood if you have tattoos or piercings, as long as the tattoo was done at a licensed facility and there are no complications or infections present.',
    },
    {
      question: 'What should I do before and after donating blood?',
      answer: 'Before donating blood, ensure you eat well, drink plenty of fluids, and get enough rest. After donating, it’s important to stay hydrated, eat a light snack, and avoid strenuous activities for a few hours.',
    },
    {
      question: 'What are the benefits of donating blood?',
      answer: 'Donating blood can save lives, improve your heart health, and help maintain your own blood production. It can also provide a sense of fulfillment by helping others in need.',
    },
    {
      question: 'What is the difference between whole blood and blood components?',
      answer: 'Whole blood is the entire blood as it is collected. Blood components include red blood cells, plasma, and platelets, which are separated and can be used to treat different medical conditions.',
    },
    {
      question: 'Can I donate blood if I am pregnant?',
      answer: 'No, it is not recommended for pregnant women to donate blood. Blood donation during pregnancy can pose risks to both the donor and the unborn child.',
    },
    {
      question: 'How is blood donation stored?',
      answer: 'Blood donations are stored in special blood banks at the appropriate temperature. Red blood cells are typically stored for up to 42 days, while plasma and platelets have a shorter shelf life.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {faqItems.map((faq, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg mb-4">
          {/* FAQ Question */}
          <button
            className="w-full text-left p-4 bg-gray-100 text-xl font-semibold text-gray-800 rounded-t-lg focus:outline-none hover:bg-gray-200"
            onClick={() => toggleAnswer(index)}
          >
            {faq.question}
          </button>

          {/* FAQ Answer */}
          {openIndex === index && (
            <div className="p-4 text-gray-600">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
