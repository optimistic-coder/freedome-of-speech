import React, { useContext, useEffect, useState } from 'react';
import { EthContext } from '../contexts/EthContext';

const Home = () => {
  const {  contract } = useContext(EthContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (contract) {
          const startIndex = page * postsPerPage;
          const result = await contract.methods.viewPosts(startIndex, postsPerPage).call();
          
          setPosts(result);
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [contract, page]); // Dependency array includes 'contract' and 'page' to re-run when either changes

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
      <h2>Home</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p>ID: {post.id}</p>
            <p>Content: {post.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={page === 0}>
        Previous
      </button>
      <button onClick={handleNextPage}>
        Next
      </button>
    </div>
  );
};

export default Home;
