import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useGlobalContext } from '../../../../context/globalState';
import { CREATE_POST } from '../../../../context/actions';
import { createPost } from '../../../../util/api';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch, setErrorMessage } = useGlobalContext();

  const onSubmit = useCallback((e) => {
    setLoading(true);
    e.preventDefault();

    // Assume that form has only two fields, due to avoid creating a bunch of inputs as Controlled Components
    const title = e.target[0].value;
    const body = e.target[1].value;

    createPost({ title, body })
      .then(res => {
        dispatch({
          type: CREATE_POST,
          payload: res.data
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));

    e.target.reset();
  }, [dispatch, setErrorMessage]);

  return loading ? <LoadingSpinner/>
    : (
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Post title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter title" required />
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" placeholder="Enter description" required />
        </Form.Group>
        <Button variant="primary" type="submit">Create Post</Button>
      </Form>
    );
};

export default CreatePost;
