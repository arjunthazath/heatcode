import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Submissions.css';

function Submissions() {
    const { pid } = useParams();
    const cleanId = pid.substring(1);
    const [submissions, setSubmissions] = useState([]);

    const init = async () => {
        try {
            const response = await fetch(`http://localhost:3000/submissions/${pid}`, {
                method: "GET",
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });
            const json = await response.json();
            setSubmissions(json.submissions);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="submissions-container">
            <h1>Submissions for Problem {pid}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Submission</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={index}>
                            <td>{submission.submission}</td>
                            <td className={submission.status === "AC" ? "status-ac" : "status-wa"}>{submission.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Submissions;
