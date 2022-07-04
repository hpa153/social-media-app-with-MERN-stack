import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import { getPosts } from '../../actions/posts';

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentID, setCurrentID] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentID])

  return (
    <Grow in>
      <Container>
        <Grid className={classes.contentContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentID={currentID} setCurrentID={setCurrentID} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;