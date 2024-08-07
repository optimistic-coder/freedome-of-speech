import React, { useContext, useEffect, useState } from 'react';
import { EthContext } from '../contexts/EthContext';

const ViewPosts = () => {
  const { contract } = useContext(EthContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await contract.methods.viewPosts(page, pageSize).call();
        setPosts(result);
      } catch (error) {
        console.error('Fetching posts failed', error);
      }
    };

    fetchPosts();
  }, [contract, page, pageSize]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h2>View Posts</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <p>Content: {post.content}</p>
          <p>ID: {post.id}</p>
        </div>
      ))}
      <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default ViewPosts;
