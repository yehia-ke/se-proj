import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About, Contact, Home, Onboard, Login, UserOnboard, Userdashboard, Facultydashboard, Companydashboard, Scaddashboard,
Userprofile, Userinternship, Companyinternship, Scadinternship, Userhistory, WritingEvaluation, WorkshopsVod, WorkshopsLive, CompanyInterns, ScadStudents, ScadReports, VideoCallpage, FacultyReports, VideoCallPageScad } from './old/pages';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

const UserContext = createContext(null);
//test
export const useUser = () => {
  return useContext(UserContext);
};


const ProtectedRoute = ({ allowedUserTypes, children }: { allowedUserTypes: string[]; children: React.ReactNode }) => {
  const { userType } = useUser();

  if (!allowedUserTypes.includes(userType)) {

    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [userType, setUserType] = useState('user');

  return (
    <main>
      <UserContext.Provider value={{ userType, setUserType }}>
        <BrowserRouter>
          <div className="min-h-screen w-full flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* Protected Routes */}
              <Route
                path="/onboard"
                element={
                  <ProtectedRoute allowedUserTypes={['admin', 'user']}>
                    <Onboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/useronboard"
                element={
                  <ProtectedRoute allowedUserTypes={['admin', 'user']}>
                    <UserOnboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
              path="/workshop/vod" 
              element={<WorkshopsVod/>} 
              />
              <Route
              path="/workshop/live" 
              element={<WorkshopsLive/>} 
              />
              <Route
                path="/userdashboard/:status"
                element={<Userdashboard />}
              /> {/* Dynamic URL */}

              <Route
                path="/userdashboard"
                element={<Userdashboard />} />

              <Route
                path="/userdashboard/internship/:status"
                element={<Userinternship />}
              /> {/* Dynamic URL */}

                            <Route
                path="/userdashboard/history/:status"
                element={<Userhistory />}
              /> {/* Dynamic URL */}

              <Route
                path="/scaddashboard"
                element={<Scaddashboard />}
              />
              <Route
                path="/facultydashboard"
                element={<Facultydashboard />}
              />
              <Route
                path="/companydashboard"
                element={<Companydashboard />}
              />
              <Route
                path="/userdashboard/profile"
                element={<Userprofile />}
              />
              <Route
                path="/userdashboard/internship"
                element={<Userinternship />}
              />
              <Route
                path="/userdashboard/history"
                element={<Userhistory />}
              />
              <Route
                path="/scaddashboard/internship"
                element={<Scadinternship />}
              />
              <Route
                path="/evaluation"
                element={<WritingEvaluation />}
              />
              <Route
                path="/companydashboard/internship"
                element={<Companyinternship />}
              />
              <Route
                path="/scaddashboard/students"
                element={<ScadStudents />}
              />
              <Route
                path="/scaddashboard/reports"
                element={<ScadReports />}
              />
              <Route
                path="/companydashboard/interns"
                element={<CompanyInterns />}
              />

              <Route
                path="/facultydashboard/reports"
                element={<FacultyReports />}
              />

              <Route
                path="/VideoCallPage"
                element={<VideoCallpage />}
              />

              <Route
                path="/VideoCallPageScad"
                element={<VideoCallPageScad />}
              />

            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </main>
  );
}

export default App;
