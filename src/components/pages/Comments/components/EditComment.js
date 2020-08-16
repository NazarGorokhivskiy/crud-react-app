import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useGlobalContext } from '../../../../context/globalState';
import { editComment } from '../../../../util/api';
import { EDIT_COMMENT } from '../../../../context/actions';
import LoadingSpinner from '../../../shared/LoadingSpinner';

function EditComment ({ onEditEnd, comment }) {
  const { dispatch, setErrorMessage } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((e) => {
    setLoading(true);

    e.preventDefault();

    // Assume that form has only two fields, due to avoid creating a bunch of inputs Controlled Components
    const name = e.target[0].value;
    const body = e.target[1].value;
    const email = e.target[2].value;

    editComment(comment.id, { name, body, email })
      .then(res => {
        dispatch({
          type: EDIT_COMMENT,
          payload: {
            id: comment.id,
            name,
            body,
            email
          }
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => {
        setLoading(false);
        onEditEnd();
      });
  }, [comment, dispatch, setErrorMessage, onEditEnd]);

  return loading ? <LoadingSpinner />
    : (
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>New Post title</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter new name"
            required
            defaultValue={comment.name}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label>New Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter new description"
            required
            defaultValue={comment.body}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Comment Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
            defaultValue={comment.email}
          />
        </Form.Group>
        <div className="d-flex">
          <Button variant="primary" type="submit">Edit Comment</Button>
          <Button
            className="ml-2"
            variant="danger"
            onClick={onEditEnd}>
              Cancel
          </Button>
        </div>
      </Form>
    );
}

export default EditComment;
