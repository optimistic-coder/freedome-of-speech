import React, { useContext, useEffect, useState } from 'react';
import { EthContext } from '../contexts/EthContext';
import { Link } from 'react-router-dom';

const ViewPosts = () => {
  const { contract, isLoggedIn } = useContext(EthContext); 
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserHash, setIsUserHash] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const result = await contract.methods.viewPosts(page, pageSize).call();
        setPosts(result);


      } catch (error) {
        console.error('Fetching posts failed', error);
        setError('Failed to fetch posts. Please try again.');
      } finally {
        setIsLoading(false);
        const hash = localStorage.getItem('userHash');
        if(hash){
          setIsUserHash(true)
        }
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
    <div className="view-posts-container">
      <h2 className="posts-heading">View Posts</h2>
      {isLoading && <p className="loading-message">Loading posts...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="post-item" key={index}>
              <p className="post-content">Content: {post.content}</p>
              <p className="post-id">ID: {post.id}</p>
            </div>
          ))
        ) : (
          !isLoading && <p className="no-posts">No posts available</p>
        )}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={posts.length < pageSize}
        >
          Next
        </button>
      </div>
      {!isUserHash && (
        <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/register" className="auth-button">Register</Link>
        </div>
      )}
      {isUserHash && (
        <div className="auth-buttons">
          <Link to="/post" className="auth-button">Add Post</Link>
        </div>
      )}
    </div>
  );
};

export default ViewPosts;
