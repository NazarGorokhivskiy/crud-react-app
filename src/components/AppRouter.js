import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import PostsPage from './pages/Posts';
import CommentsPage from './pages/Comments';
import { getAllPosts } from '../util/api';
import { useGlobalContext } from '../context/globalState';
import { INIT_POSTS } from '../context/actions';


function AppRouter (props) {
  const { dispatch, setErrorMessage } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(res => {
        dispatch({
          type: INIT_POSTS,
          payload: res.data
        });
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  }, [dispatch, setErrorMessage]);

  return (
    <Router>
      <Switch>
        <Route path="/comments/:id" component={CommentsPage} />
        <Route path="/">
          <PostsPage loading={loading}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
