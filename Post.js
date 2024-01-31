import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div>
      <Link to={`post/${post.id}`}>
      <h1>{post.title}</h1>
      <h4>{post.date}</h4>
      <p>{post.content}</p>
      </Link></div>
  )
}

export default Post