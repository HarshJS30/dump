import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/dump.css';
import { FaArrowRight } from "react-icons/fa";
export function Home(){
    
    const [dumps,setDumps] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/post")
            .then((res)=>res.json())
            .then((data)=>setDumps(data.data))
            .catch((err)=>console.error("Fetch error:",err))
    },[])
    
    return(
        <div className="struct">
            <h1>My Digital <span>Dump</span></h1>
            
            {dumps.map((dump) => (
                <div key={dump.id}>
                    <Link to={`/post/${dump.id}`}>
                    <h4 className='struct2'><FaArrowRight className='arrow' />{dump.title}</h4>
                    </Link>
                </div>
            ))}
        </div>
    )
}