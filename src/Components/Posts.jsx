import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../StyleSheet/Posts.css';
import Home from '../Components/Home.jsx';

const Posts = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [postsToShow, setPostsToShow] = useState([]);
    const [error, setError] = useState('');
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [editingPost, setEditingPost] = useState(null);
    const [expandedPost, setExpandedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState({ title: '', id: '' });

    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/posts?userId=${currentUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllPosts(data);
                setPostsToShow(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts');
            });
    }, []);

    const handleSearch = () => {
        const { title, id } = searchQuery;

        const filteredPosts = allPosts.filter(post => {
            const matchesTitle = post.title.toLowerCase().includes(title.toLowerCase());
            const matchesId = id ? String(post.id) === id : true;
            return matchesTitle && matchesId;
        });

        setPostsToShow(filteredPosts);
    };

    const handleAddPost = () => {
        const newId = allPosts.length > 0 ? Math.max(...allPosts.map(post => post.id)) + 1 : 1;

        const postToAdd = {
            id: newId,
            userId: currentUser.id,
            title: newPost.title,
            body: newPost.body,
        };

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postToAdd),
        })
            .then(response => response.json())
            .then(data => {
                setAllPosts([...allPosts, data]);
                setPostsToShow([...postsToShow, data]);
                setNewPost({ title: '', body: '' });
            })
            .catch(error => console.error('Error adding post:', error));
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
    };

    const handleSaveEdit = () => {
        fetch(`http://localhost:3000/posts/${editingPost.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingPost),
        })
            .then(response => response.json())
            .then(updatedPost => {
                setAllPosts(allPosts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
                setPostsToShow(postsToShow.map(post => (post.id === updatedPost.id ? updatedPost : post)));
                setEditingPost(null);
            })
            .catch(error => console.error('Error updating post:', error));
    };

    const handleDelete = (postId) => {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error deleting post');
                }
                console.log("Post deleted:", postId);  // לוג למחיקה
                // עדכון הסטייטים לאחר מחיקת הפוסט
                setAllPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); 
                setPostsToShow((prevPosts) => prevPosts.filter((post) => post.id !== postId)); 
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    return (
        <div className="posts-page-container">
            <Home />
            <div className="posts-container">
                <h1 className="posts-title">Your Posts</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery.title}
                        onChange={(e) => setSearchQuery({ ...searchQuery, title: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Search by ID..."
                        value={searchQuery.id}
                        onChange={(e) => setSearchQuery({ ...searchQuery, id: e.target.value })}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="add-post-form">
                    <h2>Add New Post</h2>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Post Content"
                        value={newPost.body}
                        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    />
                    <button className="add-post-button" onClick={handleAddPost}>
                        Add Post
                    </button>
                </div>
                <div className="posts-list">
                    {postsToShow.length > 0 ? (
                        postsToShow.map(post => (
                            <div key={post.id} className="post-card">
                                {editingPost && editingPost.id === post.id ? (
                                    <div className="edit-post-form">
                                        <input
                                            type="text"
                                            value={editingPost.title}
                                            onChange={(e) =>
                                                setEditingPost({ ...editingPost, title: e.target.value })
                                            }
                                        />
                                        <textarea
                                            value={editingPost.body}
                                            onChange={(e) =>
                                                setEditingPost({ ...editingPost, body: e.target.value })
                                            }
                                        />
                                        <button className="save-edit-button" onClick={handleSaveEdit}>
                                            Save
                                        </button>
                                        <button
                                            className="cancel-edit-button"
                                            onClick={() => setEditingPost(null)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="post-title">{post.title}</h2>
                                        <p className="post-content">
                                            {expandedPost === post.id
                                                ? post.body
                                                : `${post.body.slice(0, 50)}...`}
                                        </p>
                                        <button
                                            className="expand-button"
                                            onClick={() =>
                                                setExpandedPost(expandedPost === post.id ? null : post.id)
                                            }
                                        >
                                            {expandedPost === post.id ? 'Show Less' : 'View More'}
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEditPost(post)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="view-comments-button"
                                            onClick={() => navigate(`/posts/${post.id}/comments`,{state:post.id})}
                                        >
                                            View Comments
                                        </button>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="error-message">{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Posts;
