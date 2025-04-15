import { useState } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PiListBullets } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import '../assets/dump.css';

export function Post() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const editor = useEditor({
        extensions: [StarterKit],
        content: "Write Something...",
    });

    return (
        <div className='create'>
            <h2>Welcome, Dump here.</h2>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const content = editor.getHTML(); // Get the HTML content

                const res = await fetch("https://dump-gkh9.onrender.com/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, content }) // Send content with HTML
                });

                if (res.ok) {
                    navigate("/"); // Navigate back to the home page on success
                } else {
                    alert("Failed to dump.");
                }
            }}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Enter the title'
                />
                <div className="container">
                    {editor && (
                        <div className="toolbar">
                            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className='bold'>
                                Bold
                            </button>
                            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className='italic'>
                                Italic
                            </button>
                            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className='strike'>
                                Strike
                            </button>
                            <button type='button' onClick={() => editor.chain().focus().toggleBulletList().run()} className='bullet'>
                                <PiListBullets />
                            </button>
                        </div>
                    )}
                    {editor && <EditorContent editor={editor} className='content' />}
                </div>
                <button className='submit' type='submit'>Dump</button>
            </form>
        </div>
    );
}
