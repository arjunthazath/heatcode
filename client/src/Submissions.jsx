import React, { useState } from 'react'
import { useParams } from 'react-router-dom';


function Submissions() {
    const { pid } = useParams();
    const cleanId = pid.substring(1);
    const [submissions, setSubmissions] = useState([]);

    const init = async () => {
        try {
            const response = await fetch(`http://localhost:3000/submissions/${cleanId}`, {
                method: "GET",
            });
            const json = await response.json();
            setSubmissions(json.submissions);
        } catch (error) {
            console.error("Failed to fetch problems:", error);
        }
    };

    useEffect(() => {
        init();
    }, []);

  return (
    <div>{submissions}</div>
  )
}

export default Submissions