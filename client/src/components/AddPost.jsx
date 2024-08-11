import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext'; 

const AddPost = () => {
  const { account, contract } = useContext(EthContext);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPost = async () => {
    setError('');
    if (!content.trim()) {
      setError('Content cannot be empty.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await contract.methods.addPost(content).send({ from: account });
      console.log('Post added:', result);
      setContent(''); 
    } catch (error) {
      console.error('Adding post failed', error);
      setError('Failed to add post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-post-container">
      <h2 className="add-post-heading">Add Post</h2>
      <div className="add-post-form">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="add-post-input"
        />
        <button onClick={handleAddPost} className="add-post-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Post'}
        </button>
      </div>
      {error && <p className="add-post-error">{error}</p>}
    </div>
  );
};

export default AddPost;
