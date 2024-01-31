import React from 'react'

const Newpost = ({postTitle,setPostTitle,postContent,setPostContent,handleSubmit}) => {
 
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>title</label>
            <input id='title' type='text' placeholder='title' value={postTitle} onChange={(e)=>setPostTitle(e.target.value)}/>
            <br></br><br></br>
            <label htmlFor='content'>content</label>
            <textarea id='content' rows='5' cols='100' type='text' placeholder='content' value={postContent} onChange={(e)=>setPostContent(e.target.value)} />
            <br></br><br></br>
            <button type='submit'>post</button>
        </form>
    </div>
  )
}

export default Newpost