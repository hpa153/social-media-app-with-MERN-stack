import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Forms/Form';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentID, setCurrentID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAdd = (tag) => {
    setTags([ ...tags, tag]);
  }

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  const searchPost = () => {
    if(searchTerm.trim() || tags) {
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentID={setCurrentID} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Stories"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button color="primary" variant="contained" onClick={searchPost}>Search</Button>
            </AppBar>
            <Form currentID={currentID} setCurrentID={setCurrentID} />
            {
              (!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6}>
                  <Paginate page={page}/>
                </Paper>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;