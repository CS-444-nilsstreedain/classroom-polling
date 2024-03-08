import './App.css';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

/*
  Page Imports
*/
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import ConfirmationCodePasswordRequest from './pages/ConfirmationCodePassword'
import ResetPasswordForLoginUser from './pages/ResetPassword';
import Confirm from './pages/Confirm';
import Landing from './pages/Landing';
import Course from './pages/Course';
import Lectures from './pages/Lectures';
import Lecture from './pages/Lecture';
import Sections from './pages/Sections';
import Section from './pages/Section';
import LectureInSection from './pages/LectureInSection';
import Questions from './pages/Questions';
import CreateQuestion from './pages/CreateQuestion';
import Roster from './pages/Roster';
import Enrollments from './pages/Enrollments';
import SingleCoursePage from './pages/SingleCoursePage';
import AddCourse from './pages/AddCourse';
import AddLecture from './pages/AddLecture';
import Home from './pages/Home';


import Navigation from './components/nav/Navigation';

import useAuth from './hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { TailSpin } from  'react-loader-spinner';
import SingleQuestion from './pages/SingleQuestion';

function App() {

  const [ loggedIn, message, error, loading ] = useAuth()

  return (
    <>
      { loading === true ? <TailSpin visible={true}/> : <Routes>
        {/* There are only 4 accessible pages for users who are not logged in:
            - home
            - create account
            - login
            - password reset
          */}

        <Route element={ <Navigation loggedIn={loggedIn}></Navigation> }>
          <Route path='/home' element={ <Home/> }/>
          <Route element={ loggedIn ? <Navigate to='/'/> : <Outlet/>}>
            <Route path='/login' element={ <Login/> } />
            <Route path='/create' element={ < Signup /> } /> {/* redirects to landing page if a user is logged in already */}
            <Route path='/reset' element={ < ConfirmationCodePasswordRequest /> } /> {/* redirects to landing page if a user is logged in already */}
            <Route path='/reset/password' element={ < ResetPasswordForLoginUser /> } />
          </Route>

          { /* All routes below require a user be loggied in */}
          <Route element={ loggedIn === true ? <Outlet/> : <Navigate to='/login'/>}>
            <Route path='/' element= {<Landing/> }/>
            <Route path='/profile' element={ <Profile /> } />
            <Route path='/confirm' element={ <Confirm /> } />
            <Route path='/createcourse' element={ <AddCourse/> }/>
            <Route path='/:courseId'>
              <Route path='' element={ <SingleCoursePage /> } /> 
              <Route path='questions' element={<Outlet/>}>
                <Route path='' element={ <Questions/>}/>
                <Route path=':questionId' element={ <SingleQuestion/>}/>
                <Route path='add' element={ <CreateQuestion/> }/>
              </Route>
              <Route path='lectures' element={ <Outlet/>}>
                <Route path='' element={<Lectures/>}/>
                <Route path=':lectureId' element={<Outlet/>}>
                  <Route path='' element={<Lecture/>}/>
                  <Route path='questions' element={<Outlet/>}>
                    <Route path='' element={<Questions/>}/>
                    <Route path='add' element={<CreateQuestion/>} />
                    <Route path=':questionId' element={<SingleQuestion/>}/>
                  </Route>
                </Route>
              </Route>
              <Route path='roster' element={ <Outlet/>}>
                <Route path='' element={<Roster/>}/>
                <Route path=':sectionId' element={<Enrollments/>}/>
              </Route>
              <Route path='createlecture' element={<AddLecture/>}/>
              <Route path='sections' element={<Outlet/>}>
                <Route path='' element={<Sections/>}/>
                <Route path=':sectionId' element={<Outlet/>}>
                  <Route path='' element={<Section/>}/>
                  <Route path='lectures/:lectureId' element={<LectureInSection/>}/>
                </Route>
              </Route>
                {/* TODO: the remainder of the nested routes should go here */}
            </Route>
          </Route>
        </Route>
      </Routes>}
    </>  
    );
}

export default App;
