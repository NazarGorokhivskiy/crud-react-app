import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useGlobalContext } from '../../../../context/globalState';
import { editPost } from '../../../../util/api';
import { EDIT_POST } from '../../../../context/actions';
import LoadingSpinner from '../../../shared/LoadingSpinner';

function EditPost ({ post, onEditEnd }) {
  const { dispatch, setErrorMessage } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((e) => {
    setLoading(true);

    e.preventDefault();

    // Assume that form has only two fields, due to avoid creating a bunch of inputs Controlled Components
    const title = e.target[0].value;
    const body = e.target[1].value;

    editPost(post.id, { title, body })
      .then(res => {
        dispatch({
          type: EDIT_POST,
          payload: {
            id: post.id,
            title,
            body
          }
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => {
        setLoading(false);
        onEditEnd();
      });
  }, [post, dispatch, setErrorMessage, onEditEnd]);

  return loading ? <LoadingSpinner />
    : (
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>New Post title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter new title"
            required
            defaultValue={post.title}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label>New Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter new description"
            required
            defaultValue={post.body}
          />
        </Form.Group>
        <div className="d-flex">
          <Button variant="primary" type="submit">Edit Post</Button>
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

export default EditPost;
