import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext';

const AddPost = () => {
  const { account, contract } = useContext(EthContext);
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    try {
      const result = await contract.methods.addPost(content).send({ from: account });
      console.log('Post added:', result);
    } catch (error) {
      console.error('Adding post failed', error);
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default AddPost;
