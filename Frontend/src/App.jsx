import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landingpage from './Pages/LandingPage'
import DoctorPage from './Pages/DoctorRegPage'
import HospitalRegistration from './Components/Hospital/HospitalRegistration'
import ClinicRegistration from './Components/Clinic/ClinicRegistration'
import ConsultantRegistration from './Components/Consultant/ConsultantRegistration'
import ConsultantLogin from './Components/Consultant/ConsultantLogin'
import ClinicLogin from './Components/Clinic/ClinicLogin'
import HospitalLogin from './Components/Hospital/HospitalLogin'
import HospitalNavbar from './Components/Navbar/HospitalNav'
import HospitalDashboard from './Components/Hospital/Mainpage'
import ClinicDashboard from './Components/Clinic/MainPage'
import ClinicNav from './Components/Navbar/ClinicNav'
import HealthcareSearch from './Components/Patient/Mainpage'
import UserNav from './Components/Navbar/UserNav'
import AddDoctor from './Components/Hospital/AddDoctor'
import AllDoctors from './Components/Hospital/AllDoctor'
import SpecialtyResults from './Components/Patient/Results/SpecialityResult'
import DoctorResults from './Components/Patient/Results/DoctorResult'
import HospitalResults from './Components/Patient/Results/HospitalResult'
import ClinicResults from './Components/Patient/Results/ClinicResult'
import UserLogin from './Components/Patient/Login'
import Hospitals from './Components/Patient/NavResults/NavHospital'
import NavDoctors from './Components/Patient/NavResults/NavDoctors'
import DoctorProfile from './Components/Patient/NavResults/DoctorProfile'
import About from './Components/Patient/NavResults/About'
import Help from './Components/Patient/NavResults/Help'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/doctorpage" element={<DoctorPage />} />
        <Route path="/hospitalregistration" element={<HospitalRegistration />} />
        <Route path="/clinicregistration" element={<ClinicRegistration />} />
        <Route path="/consultantregistration" element={<ConsultantRegistration />} />
        <Route path="/consultantlogin" element={<ConsultantLogin />} />
        <Route path="/cliniclogin" element={<ClinicLogin />} />
        <Route path="/hospitallogin" element={<HospitalLogin />} />
        <Route path="/hospitalnav" element={<HospitalNavbar />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/clinic/dashboard" element={<ClinicDashboard />} />
        <Route path="/clinicnav" element={<ClinicNav />} />
        <Route path="/patientpage" element={<HealthcareSearch />} />
        <Route path="/usernav" element={<UserNav />} />
        <Route path="/adddoctor" element={<AddDoctor />} />
        <Route path="/alldoctors" element={<AllDoctors />} />
        <Route path="/specialtyresults" element={<SpecialtyResults />} />
        <Route path="/doctorresults" element={<DoctorResults />} />
        <Route path="/hospitalresults" element={<HospitalResults />} />
        <Route path="/clinicresults" element={<ClinicResults />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usernavhospitals" element={<Hospitals />} />
        <Route path="/usernavdoctors" element={<NavDoctors />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/usernavabout" element={<About />} />
        <Route path="/usernavhelp" element={<Help />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default App