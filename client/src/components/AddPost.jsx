import React,{useState,useContext} from 'react'
import { EthContext } from '../contexts/EthContext';


const AddPost=()=>{
    const {  contract,account } = useContext(EthContext);
    const [post,setPost] = useState("")

    const addPost=async()=>{
        if(post!==""){
            try {
                console.log(account,"3434",contract)
                const response = await contract.methods.addPost(post).send({ from: account });
                console.log(response)
              } catch (error) {
                console.error("Registration failed", error);
              }

        }
    }
    const onChange=(str)=>setPost(str)
    return(
        <>
        <input onChange={(e)=>onChange(e.target.value)}/>
        <button onClick={()=>addPost()}>Submit</button>
        </>
    )
}
export default AddPost;