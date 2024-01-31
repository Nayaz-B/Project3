import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams()
  const post=posts.find(post=>(post.id).toString()===id)
  return (
    <div>
      {
        post&&
        <>
        <h1>{post.title}</h1>
        <h2>{post.date}</h2>
        <p>{post.content}</p>
        <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
        <button onClick={()=>handleDelete(post.id)}>Delete post</button>
        </>
      }
      {
        !post&&
        <>
        <h1>post not found</h1>
        <p>please visit the home page</p>
        </>
      }
    </div>
  )
}

export default PostPage