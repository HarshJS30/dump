import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../assets/dump.css'

export function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dump-gkh9.onrender.com/post/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2 className='single-post'>Loading...</h2>;
    if (!post) return <h2 className='single-post'>Post not found</h2>;

    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <hr className='line'/>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
}
