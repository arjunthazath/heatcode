import React, { createRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import './App.css';
import ProblemList from './ProblemList.jsx';
import ProblemDetail from './ProblemDetail.jsx';


const App = () => {
  const location = useLocation();
  const nodeRef = createRef();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        nodeRef={nodeRef}
        classNames="fade"
        timeout={300}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signin" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:pid" element={<ProblemDetail />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
