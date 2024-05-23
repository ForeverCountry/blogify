import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled
    setIsFormValid(title && summary && content && files.length > 0);
  }, [title, summary, content, files]);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={e => setSummary(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={e => setFiles(e.target.files)}
        required
      />
      <Editor value={content} onChange={setContent} />
      {isFormValid && (
        <button type="submit" style={{ marginTop: '5px' }}>
          Create post
        </button>
      )}
    </form>
  );
}
