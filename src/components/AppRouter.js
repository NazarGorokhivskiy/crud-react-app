import React, { useEffect, useState, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { getAllPosts } from '../util/api';
import { useGlobalContext } from '../context/globalState';
import { INIT_POSTS } from '../context/actions';
import LoadingSpinner from "./shared/LoadingSpinner";

const PostsPage = lazy(() => import('./pages/Posts'));
const CommentsPage = lazy(() => import('./pages/Comments'));

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
      <Suspense fallback={<LoadingSpinner/>}>
        <Switch>
          <Route path="/comments/:id" component={CommentsPage} />
          <Route path="/">
            <PostsPage loading={loading}/>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
