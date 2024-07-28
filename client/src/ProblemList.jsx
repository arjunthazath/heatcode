//ProblemList.jsx
import React, { useEffect, useState } from 'react';
import './ProblemList.css';
import { Link } from 'react-router-dom';
import leetcode from './assets/leetcode-logo.png';

function ProblemsList() {
    const [problems, setProblems] = useState([]);

    const init = async () => {
        try {
            const response = await fetch("http://localhost:3000/problems", {
                method: "GET",
            });
            const json = await response.json();
            setProblems(json.problems);
        } catch (error) {
            console.error("Failed to fetch problems:", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className='page'>
            <div className='header'>
                <img alt="leetcode-logo" className="leetcode" src={leetcode}></img>
                <button>Logout</button>
            </div>
            <div className="fullbox">
                <table>
                    <thead>
                        <tr>
                            <th>Problem Id</th>
                            <th className='tit'>Title</th>
                            <th>Difficulty</th>
                            <th>Acceptance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr key={problem.problemId}>
                                <td className='pid'>{problem.problemId}</td>
                                <td>
                                    <Link to={`/problems/:${problem.problemId}`}>
                                        {problem.title}
                                    </Link>
                                </td>
                                <td className={problem.difficulty.toLowerCase()}>{problem.difficulty}</td>
                                <td className='pid'>{problem.acceptance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProblemsList;