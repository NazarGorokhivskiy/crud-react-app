import React, { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Post from './components/Post';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Title from '../../shared/Title';
import { useGlobalContext } from '../../../context/globalState';
import LoadingSpinner from '../../shared/LoadingSpinner';

function Posts ({ loading }) {
  const { posts } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  const handlePostEdit = useCallback(post => {
    setEditMode(true);
    setEditedPost(post);
  }, [setEditMode, setEditedPost]);

  const handleEditEnd = useCallback(() => {
    setEditMode(false);
    setEditedPost(null);
  }, [setEditMode, setEditedPost]);

  return (
    <Container>
      <Row className='mt-4'>
        <Title>My Posts</Title>
      </Row>
      <Row>
        <Col>
          {editMode
            ? <EditPost post={editedPost} onEditEnd={handleEditEnd} />
            : <CreatePost />
          }
        </Col>
        <Col>
          {loading
            ? <LoadingSpinner />
            : posts.map(post => <Post key={post.id} post={post} onEdit={handlePostEdit} />)}
        </Col>
      </Row>
    </Container>
  );
}

export default Posts;
