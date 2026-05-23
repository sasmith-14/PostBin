import React, { useState, useEffect } from 'react';
import '../App.css';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const res = await fetch('http://localhost:3000/feed');
      const data = await res.json();
      setFeed(data.reverse()); // Show newest first
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) return <div className="loading-state">Loading posts...</div>;

  return (
    <section className="feed-section">
      {feed.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <p>No posts yet. Be the first to share something!</p>
        </div>
      ) : (
        <div className="feed-grid">
          {feed.map((post) => (
            <div key={post._id} className="post-card glass">
              <div className="post-image-container">
                <img src={post.image} alt={post.caption} className="post-image" loading="lazy" />
              </div>
              {post.caption && (
                <div className="post-caption">
                  <p>{post.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
