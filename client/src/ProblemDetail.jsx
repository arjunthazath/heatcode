import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProblemDetail.css';
import leetcode from './assets/leetcode-logo.png';

function ProblemDetail() {
  const [CodeSeg, setCodeSeg] = useState("");
  const { pid } = useParams();
  const cleanId = pid.substring(1); 
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await fetch(`http://localhost:3000/problems/${cleanId}`, {
        method: "GET"
      });

      const json = await response.json();
      setProblem(json.problem);
    } catch (error) {
      console.error("Failed to fetch problem details:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleKey = (event) => {
    if (event.key == "Tab"){
      event.preventDefault() ;
      const { selectionStart , selectionEnd , value } = event.target ;
      const val = value.substring(0,selectionStart) + "\t" + value.substring(selectionStart) ;
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd = selectionStart+1;
    }
    setCodeSeg(event.value) ;
  }

  const handleSubmission= async()=>{
    const response= await fetch("http://localhost:3000/submission",{
      method:"POST",
      headers:{
        "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        problemId:cleanId, 
        submission: submission})
    });
    const json= await response.json();
    console.log(json);
    
  }




  return (
    <div>
      {problem ? (
        <div>
          <div className="topbox">
            <img alt="leetcode-logo" className="leetcode" src={leetcode} />
            <button onClick={() => navigate("/logout")}>Logout</button>
          </div>
          <div className="mainbox">
            <div className="leftbox">
              <h1>{problem.problemId}. {problem.title}</h1>
              <h2>Description</h2>
              <p>{problem.description}</p>
              <code>Input: {problem.exampleIn}</code><br></br><br></br>
              <code>Output: {problem.exampleOut}</code>
            </div>
            <div className="rightbox">
              <textarea placeholder="Enter your code here" onChange={(e)=>setSubmission(e.target.value)}name="SolvedCode" onKeyDown={ (event) => handleKey(event)}></textarea>
              <button onClick={handleSubmission}>SUBMIT</button>

            </div>
          </div>
        </div>
      ) : (
        <div>not found</div>
      )}
    </div>
  );
}

export default ProblemDetail;
