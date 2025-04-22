import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/dump.css';
import { FaArrowRight } from "react-icons/fa";

export function Home() {
    const [dumps, setDumps] = useState([]);

    useEffect(() => {
        const cachedDumps = sessionStorage.getItem('dumps');
        if (cachedDumps) {
            setDumps(JSON.parse(cachedDumps));
        } else {
            fetch("https://dump-gkh9.onrender.com/post")
                .then((res) => res.json())
                .then((data) => {
                    setDumps(data.data);
                    sessionStorage.setItem('dumps', JSON.stringify(data.data));
                })
                .catch((err) => console.error("Fetch error:", err));
        }
    }, []);

    return (
        <div className="struct">
            <h1>My Digital <span>Dump</span></h1>

            {dumps.map((dump) => (
                <div key={dump.id}>
                    <Link to={`/post/${dump.id}`}>
                        <h4 className='struct2'>
                            <FaArrowRight className='arrow' />
                            {dump.title}
                        </h4>
                    </Link>
                </div>
            ))}
        </div>
    );
}
