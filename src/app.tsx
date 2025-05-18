import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { About, Contact, Home, Onboard, Login, UserOnboard, Userdashboard, Facultydashboard, Companydashboard, Scaddashboard,
Userprofile, Userinternship, Companyinternship, Scadinternship, Userhistory, WritingEvaluation, WorkshopsVod, WorkshopsLive, CompanyInterns, ScadStudents, ScadReports, VideoCallpage, FacultyReports, VideoCallPageScad } from './old/pages';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

type UserType = 'student' | 'scad' | 'faculty' | 'company' | '';

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextType>({
  userType: '',
  setUserType: () => {}
});

export const useUser = () => {
  return useContext(UserContext);
};

const ProtectedRoute = ({ allowedUserTypes, children }: { allowedUserTypes: UserType[]; children: React.ReactNode }) => {
  const { userType } = useUser();

  if (!userType) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedUserTypes.includes(userType)) {
    switch(userType) {
      case 'student':
        return <Navigate to="/userdashboard" replace />;
      case 'scad':
        return <Navigate to="/scaddashboard" replace />;
      case 'faculty':
        return <Navigate to="/facultydashboard" replace />;
      case 'company':
        return <Navigate to="/companydashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  const [userType, setUserTypeState] = useState<UserType>(() => {
    // Initialize from localStorage if available
    return localStorage.getItem('userType') as UserType || '';
  });

  // Create a wrapped setUserType that updates both state and localStorage
  const setUserType = (type: UserType) => {
    setUserTypeState(type);
    if (type) {
      localStorage.setItem('userType', type);
    } else {
      localStorage.removeItem('userType');
    }
  };

  return (
    <main>
      <UserContext.Provider value={{ userType, setUserType }}>
        <BrowserRouter>
          <div className="min-h-screen w-full flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route
                path="/onboard"
                element={
                  <ProtectedRoute allowedUserTypes={['student', 'scad', 'faculty', 'company']}>
                    <Onboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/useronboard"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <UserOnboard />
                  </ProtectedRoute>
                }
              />
              
              {/* User-only routes */}
              <Route
                path="/userdashboard/:status"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userdashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userdashboard"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userdashboard />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/userdashboard/internship/:status"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userinternship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userdashboard/history/:status"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userhistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userdashboard/profile"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userprofile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userdashboard/internship"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userinternship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/userdashboard/history"
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <Userhistory />
                  </ProtectedRoute>
                }
              />
              
              {/* SCAD-only routes */}
              <Route
                path="/scaddashboard"
                element={
                  <ProtectedRoute allowedUserTypes={['scad']}>
                    <Scaddashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scaddashboard/internship"
                element={
                  <ProtectedRoute allowedUserTypes={['scad']}>
                    <Scadinternship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scaddashboard/students"
                element={
                  <ProtectedRoute allowedUserTypes={['scad']}>
                    <ScadStudents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scaddashboard/reports"
                element={
                  <ProtectedRoute allowedUserTypes={['scad']}>
                    <ScadReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/VideoCallPageScad"
                element={
                  <ProtectedRoute allowedUserTypes={['scad']}>
                    <VideoCallPageScad />
                  </ProtectedRoute>
                }
              />
              
              {/* Faculty-only routes */}
              <Route
                path="/facultydashboard"
                element={
                  <ProtectedRoute allowedUserTypes={['faculty']}>
                    <Facultydashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/facultydashboard/reports"
                element={
                  <ProtectedRoute allowedUserTypes={['faculty']}>
                    <FacultyReports />
                  </ProtectedRoute>
                }
              />
              
              {/* Company-only routes */}
              <Route
                path="/companydashboard"
                element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <Companydashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companydashboard/internship"
                element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <Companyinternship />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companydashboard/interns"
                element={
                  <ProtectedRoute allowedUserTypes={['company']}>
                    <CompanyInterns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/VideoCallPage"
                element={
                  <ProtectedRoute allowedUserTypes={['student', 'scad', 'faculty', 'company']}>
                    <VideoCallpage />
                  </ProtectedRoute>
                }
              />
              
              {/* Workshop routes */}
              <Route
                path="/workshop/vod" 
                element={
                  <ProtectedRoute allowedUserTypes={['student', 'scad', 'faculty', 'company']}>
                    <WorkshopsVod/>
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/workshop/live" 
                element={
                  <ProtectedRoute allowedUserTypes={['student', 'scad', 'faculty', 'company']}>
                    <WorkshopsLive/>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </main>
  );
}

export default App;