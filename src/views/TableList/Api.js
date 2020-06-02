import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Info from './Info';

const Api =()=>
{
   const [posts,setPosts]=useState([]);
    const fetchResponse = async()=> {
    const response= await axios.get('https://jsonplaceholder.typicode.com/posts');
 setPosts(response.data);   
};
    useEffect(()=>{
        fetchResponse();
    },[])

posts.map(p =><Info 
    key={p.id} data={p.title}/>)
);
}
export default Api;