import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editTitle,setEditTitle,editContent,setEditContent}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id)
    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditContent(post.content)
        }
    },[post,setEditTitle,setEditContent])
  return (
    <div>
        {editTitle &&
        <>
        <h2>Edit Post</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='title'>Title</label>
            <input id='title' type='text' required value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
            <label htmlFor='content'>Content</label>
            <input id='content' type='text' required value={editContent} onChange={(e)=>setEditContent(e.target.value)} />
            <button type='submit' onClick={()=>handleEdit(post.id)}> post</button>
        </form>
        </>}
        {
            !editTitle &&
            <>
            <h2>Post not found</h2>
            <p>please visit home page</p>
            </>
        }
    </div>
  )
}

export default EditPost