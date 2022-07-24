import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState([...post?.comments]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
        
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <div style={{ width: '40%' }}>
            <Typography gutterBottom variant="h6">
              Comments
            </Typography>
            {
              comments.map((comment, idx) => (
                <Typography key={idx} gutterBottom variant="subtitle1">
                  <strong>{comment.split(': ')[0]}:</strong>
                  {comment.split(':')[1]}
                </Typography>
              ))
            }
            <div ref={commentsRef} />
          </div>
          {
            user?.result?.name && (
              <div style={{ width: '60%' }}>
                <Typography gutterBottom variant="h6">
                  Write a comment
                </Typography>
                <TextField 
                  fullWidth
                  minRows={2}
                  variant="outlined"
                  label="Comment"
                  multiline
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button 
                  style={{ marginTop: '10px' }} 
                  fullWidth 
                  disabled={!comment.length} 
                  color="primary" 
                  variant="contained" 
                  onClick={handleComment}
                >
                  Comment
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CommentSection;