import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../StyleSheet/Comments.css';
import Home from './Home';

const Comments = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postId=${currentUser.id}`)
      .then((response) => response.json())
      .then(setComments)
      .catch(console.error);
  }, [postId]);

  // הוספת תגובה חדשה
  const handleAddComment = () => {
    const comment = {
      postId: parseInt(postId),
      id: Date.now().toString(),
      name: currentUser?.name || 'Guest',
      email: currentUser?.email || 'guest@example.com',
      body: newComment,
      userId: currentUser?.id || 'guest',
    };

    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment('');
      })
      .catch(console.error);
  };

  // מחיקת תגובה
  const handleDeleteComment = (commentId) => {
    const commentToDelete = comments.find((comment) => comment.id === commentId);
    if (commentToDelete?.userId === currentUser?.id) {
      fetch(`http://localhost:3000/comments/${commentId}`, { method: 'DELETE' })
        .then(() => setComments(comments.filter((comment) => comment.id !== commentId)))
        .catch(console.error);
    }
  };

  // עריכת תגובה
  const handleEditComment = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit?.userId === currentUser?.id) {
      setEditingComment(commentToEdit);
      setNewComment(commentToEdit.body);
    }
  };

  // שמירת עריכה
  const handleSaveEdit = () => {
    const updatedComment = { ...editingComment, body: newComment };
    fetch(`http://localhost:3000/comments/${editingComment.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments(comments.map((comment) => (comment.id === data.id ? data : comment)));
        setEditingComment(null);
        setNewComment('');
      })
      .catch(console.error);
  };

  return (
    <div className="comments-page-container">
      <Home />
      <div className="comments-container">
        <button className="back-to-posts-button" onClick={() => navigate('/posts')}>
          {"<<< Back to Posts"}
        </button>

        <h1 className="comments-title">Comments for Post number: {postId}</h1>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <p><strong>{comment.name}</strong> ({comment.email})</p>
              <p>{comment.body}</p>
              {/* רק אם התגובה שייכת למשתמש הנוכחי */}
              {comment.userId === currentUser?.id && (
                <div>
                  <button className="edit-comment-button" onClick={() => handleEditComment(comment.id)}>
                    Edit
                  </button>
                  <button className="delete-comment-button" onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* אם יש עריכה, תראה את אזור הטקסט לעריכה */}
        {editingComment ? (
          <>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="new-comment-textarea"
            />
            <button className="add-comment-button" onClick={handleSaveEdit}>
              Save Edit
            </button>
          </>
        ) : (
          <>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="new-comment-textarea"
            />
            <button className="add-comment-button" onClick={handleAddComment}>
              Add Comment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
