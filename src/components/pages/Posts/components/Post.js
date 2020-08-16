import React, { useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../../context/globalState';
import { DELETE_POST } from '../../../../context/actions';
import { deletePost } from '../../../../util/api';

const Post = ({ post, onEdit }) => {
  const { dispatch, setErrorMessage } = useGlobalContext();

  const handleEdit = useCallback(() => {
    onEdit(post);
  }, [onEdit, post]);

  const handleDelete = useCallback(() => {
    deletePost(post.id)
      .then(() => {
        dispatch({
          type: DELETE_POST,
          payload: post.id
        });
      })
      .catch(e => setErrorMessage(e.message));
  }, [dispatch, setErrorMessage, post.id]);

  return <Card style={{ width: '24rem', marginTop: '2rem' }}>
    <Card.Body>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>
        {post.body}
      </Card.Text>
      <div className="d-flex">
        <Link to={`/comments/${post.id}`}>
          <Button variant="info">View comments</Button>
        </Link>
        <div className="ml-auto">
          <Button variant="secondary" onClick={handleEdit}>Edit</Button>
          <Button className="ml-2" variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </Card.Body>
  </Card>;
};

export default Post;
