import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useGlobalContext } from '../../../../context/globalState';
import { createComment } from '../../../../util/api';
import { CREATE_COMMENT } from '../../../../context/actions';
import LoadingSpinner from '../../../shared/LoadingSpinner';

function CreateComment () {
  const { id: postId } = useParams();

  const [loading, setLoading] = useState(false);
  const { dispatch, setErrorMessage } = useGlobalContext();

  const onSubmit = useCallback((e) => {
    setLoading(true);
    e.preventDefault();

    // Assume that form has only two fields, due to avoid creating a bunch of inputs as Controlled Components
    const name = e.target[0].value;
    const body = e.target[1].value;
    const email = e.target[2].value;

    createComment(postId, { name, body, email })
      .then(res => {
        dispatch({
          type: CREATE_COMMENT,
          payload: res.data
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));

    e.target.reset();
  }, [postId, dispatch, setErrorMessage]);

  return loading ? <LoadingSpinner/>
    : (
      <Form className="mt-4" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Comment Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter name" required />
        </Form.Group>
        <Form.Group controlId="formBasicBody">
          <Form.Label>Comment Description</Form.Label>
          <Form.Control type="text" name="description" placeholder="Enter description" required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Comment Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" required />
        </Form.Group>
        <Button variant="primary" type="submit">Create Comment</Button>
      </Form>
    );
}

export default CreateComment;
