import axios from 'axios';

const url = "http://localhost:5000/api/post/";

class Postservice{
    //get post
    static getPosts(){
        return new Promise( (resolve, reject) => {
            try{
                const res = axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt:new Date(post.createdAt)
                    }))
                )
            }catch(err){
                reject(err);
            }
        })
    }

    //create post
    static insertPost(text){
        return axios.post(url,{
            text
        })
    }


    //delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }
}


export default Postservice