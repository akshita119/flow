
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import DonorRegistrationForm from "./pages/DonorRegistrationForm.jsx";
import LoginDonor from "./pages/LoginDonor.jsx";
import RegisterHospital from "./pages/HospitalRegistrationForm.jsx";
import LoginHospital from "./pages/LoginHopital.jsx";
import HospitalDashboard from "./pages/HospitalDashboard.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import RequestBlood from "./pages/RequestBlood.jsx";
import ViewInventory from "./pages/ViewInventory.jsx";
import ManageRequests from "./pages/ManageRequests.jsx";
import ManageInventory from "./pages/ManageInventory.jsx";
import HospitalList from "./Components/HospitalList.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import BloodBankRegistrationForm from "./pages/BloodBankRegistrationForm.jsx";
import BloodBankManagement from "./pages/BloodBankManagement.jsx";
import DonorRequestsPage from "./pages/DonorRequestsPage.jsx";
import UpdateDonor from "./pages/UpdateDonor.jsx";
import RegisterAuthority from "./pages/RegisterAuthority.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/register-donor" element={<DonorRegistrationForm />} />
      <Route path="/login-donor" element={<LoginDonor />} />
      <Route path="/register-hospital" element={<RegisterHospital />} />
      <Route path="/register-authority" element={<RegisterAuthority />} />
      <Route path="/login-hospital" element={<LoginHospital />} />
      <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
      <Route path="/hospitalist" element={<HospitalList />} />
      <Route path="/donordashboard" element={<DonorDashboard />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/register-bloodBank" element={<BloodBankRegistrationForm/>}   />
      <Route path="/blood-bank-management" element={<BloodBankManagement />} />
      <Route path="/donor-requests" element={<DonorRequestsPage />} />
      <Route path="/update-donor" element={<UpdateDonor />} />
      <Route
        path="/hospital-dashboard/request-blood"
        element={<RequestBlood />}
      />
      <Route
        path="/hospital-dashboard/view-inventory"
        element={<ViewInventory />}
      />
      <Route
        path="/hospital-dashboard/manage-requests"
        element={<ManageRequests />}
      />
      <Route
        path="/hospital-dashboard/manage-inventory"
        element={<ManageInventory />}
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
