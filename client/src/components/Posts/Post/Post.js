import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbsUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const userID = user?.result?.googleId || user?.result?._id;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID)
        ? (
          <><ThumbsUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  }

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if(likes.find((like) => like === userID)) {
      setLikes(likes.filter((id) => id !== userID));
    } else {
      setLikes([ ...likes, userID ]);
    }
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {
        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentID(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      }
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
        
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button color="primary" size="small" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
          <Button color="primary" size="small" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />&nbsp;Delete
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default Post;