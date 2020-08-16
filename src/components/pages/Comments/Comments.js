import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useGlobalContext } from '../../../context/globalState';
import Title from '../../shared/Title';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { getPostComments } from '../../../util/api';
import { GET_COMMENTS } from '../../../context/actions';
import Comment from './components/Comment';
import CreateComment from './components/CreateComment';
import EditComment from './components/EditComment';

function Comments () {
  const params = useParams();
  const postId = params.id;

  const { comments, dispatch, setErrorMessage } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(null);

  useEffect(() => {
    getPostComments(postId)
      .then(res => {
        dispatch({
          type: GET_COMMENTS,
          payload: res.data
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  }, [dispatch, postId, setErrorMessage]);

  const handleCommentEdit = useCallback(comment => {
    setEditMode(true);
    setEditedComment(comment);
  }, [setEditMode, setEditedComment]);

  const handleEditEnd = useCallback(() => {
    setEditMode(false);
    setEditedComment(null);
  }, [setEditMode, setEditedComment]);

  return (
    <Container>
      <Row className='mt-4'>
        <Title>My Comments</Title>
        <Link className="ml-auto" to="/">
          <Button variant="dark" >Back to posts</Button>
        </Link>
      </Row>
      <Row>
        <Col>
          {editMode
            ? <EditComment comment={editedComment} onEditEnd={handleEditEnd} />
            : <CreateComment />
          }
        </Col>
        <Col>
          {loading
            ? <LoadingSpinner />
            : comments.map(comment => <Comment key={comment.id} comment={comment} onEdit={handleCommentEdit} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default Comments;
