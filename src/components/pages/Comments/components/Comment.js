import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useGlobalContext } from '../../../../context/globalState';
import { deleteComment } from '../../../../util/api';
import { DELETE_COMMENT } from '../../../../context/actions';

function Comment ({ comment, onEdit }) {
  const { dispatch, setErrorMessage } = useGlobalContext();

  const handleEdit = useCallback(() => {
    onEdit(comment);
  }, [onEdit, comment]);

  const handleDelete = useCallback(() => {
    deleteComment(comment.id)
      .then(() => {
        dispatch({
          type: DELETE_COMMENT,
          payload: comment.id
        });
      })
      .catch(e => setErrorMessage(e.message));
  }, [dispatch, setErrorMessage, comment.id]);

  return (
    <Card style={{ width: '24rem', marginTop: '2rem' }}>
      <Card.Body>
        <Card.Title>{comment.name}</Card.Title>
        <Card.Text> {comment.body}</Card.Text>
        <Card.Text>
            Author Email: <strong>{comment.email}</strong>
        </Card.Text>
        <div className="d-flex">
          <Button variant="secondary" onClick={handleEdit}>Edit</Button>
          <Button className="ml-2" variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Comment;
