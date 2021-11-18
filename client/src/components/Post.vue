<template>
  <div class="container">
    <h1>latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say something</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create A post" required>
      <button @click="createPost">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post"
        v-for="(post,index) in posts" 
        :item="post"
        :index="index"
        :key="post._id"
        @dblclick="deletePost(post._id,index)"
        >
        
        <p> {{ format_date(post.createdAt)}}</p>
        <p class="text"> {{post.text}} </p>
        <button @click="deletePost(post._id,index)"> delete</button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'PostComponent',
  data () {
    return {
      posts:[],
      error :'',
      text : '',
      url : 'api/post/'
    }
  },
  async mounted(){
   
    try{
      const res = await axios.get(this.url);
      this.posts = res.data
    }catch(err){
      this.error = err.message
    }
  },

  methods : {
    format_date(value){
         if (value) {
           return moment(String(value)).format('YYYY-MM-DD')
          }
    },

    async createPost(){
      const res = await axios.post(this.url,{ text : this.text })
      this.posts.push(res.data)
      this.text = ''
    },

    async deletePost(id,index){
      await axios.delete(this.url + id)
      this.posts.splice(index,1)
     
    }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
