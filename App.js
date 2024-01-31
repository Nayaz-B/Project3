
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Missing from './Missing';

import PostPage from './PostPage';
import {format} from'date-fns';
import About from './About';
import Newpost from './Newpost';
import api from "./api/Posts"
import EditPost from './EditPost';

function App() {
  const [searchItem,setSearchItem]=useState('')
  const [postTitle,setPostTitle]=useState('')
  const [postContent,setPostContent]=useState('')
  const [filteredResult,setFilteredResult]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editContent,setEditContent]=useState('')
  const navigate=useNavigate()
    const [posts,setposts]=useState([])
    const handleSubmit=async(e)=>{
      e.preventDefault()
        const id=posts.length? [posts.length-1].id+1 : 1
        const date=format(new Date(),'yyyy/MM/dd kk:mm:ss')
        const newPost={id,title:postTitle,date,content:postContent}
        try{
          const response=await api.post('./post',newPost)
        const allpost=[...posts,response.data]
        setposts(allpost)
        setPostTitle('')
        setPostContent('')
        navigate('/')
        }
        catch(err){
          if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
          else{
            console.log(`error:${err.message}`);
          }
        }
    }
    useEffect(()=>{
    const fetchPosts=async()=>{
      try {
        const response=await api.get('/post')
    setposts(response.data);
    }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`error:${err.message}`);
      }
    }
    }
    fetchPosts();
  },[])
    useEffect(()=>{
      const result=posts.filter((post)=>(
        ((post.title).toLowerCase()).includes(searchItem.toLowerCase())||((post.content.toLowerCase()).includes(searchItem.toLowerCase())
      )))
      setFilteredResult(result.reverse())
    },[posts,searchItem])

      const handleDelete=async(id)=>{
        try{
          await api.delete(`post/${id}`)
        const postList=posts.filter(post=>post.id!==id)  
      setposts(postList)
    navigate('/')  }
    catch(err){
      if(err.response){
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
      else{
        console.log(`error:${err.message}`);
      }
    }
    }
    
    const handleEdit=async(id)=>{
        const date=format(new Date(),'ddMMyy \t HH:mm:ss');
        const updatedPost={id,title:editTitle,date,content:editContent}
        try{
          const response=await api.put(`post/${id}`,updatedPost)
          setposts(posts.map((post)=>post.id===id? {...response.data}: post))
          setEditTitle('')
          setEditContent('')
          navigate('/')
        }
        catch(err){
          if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          }
          else{
            console.log(`error:${err.message}`);
          }
        }
    }

  return (
    <div>
      <Header />
      <Nav searchItem={searchItem} setSearchItem={setSearchItem}/>

      <Routes>
        <Route path='/' element={<Home posts={filteredResult}/>}/>
        <Route path='post'>
        
        <Route index element={<Newpost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle}  postContent={postContent} setPostContent={setPostContent}/>}/>
        <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>}/> 
        
    </Route>
    <Route path='/edit/:id' element={<EditPost posts={posts}handleEdit={handleEdit} editContent={editContent} setEditContent={setEditContent} editTitle={editTitle} setEditTitle={setEditTitle}/>}/>
          <Route path='about' element={<About />} />
          <Route path='/*' element={<Missing />}/>
      </Routes>
      

    </div>
  );
}

export default App;
