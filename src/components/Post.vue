<template>
  <section class="tites">
    <div class="hero-body">
      <div id="app" class="container">
        <h1 class="title">Blog Vuejs</h1>
        <h2 class="subtitle">This is a mini blog using vuejs and bulma</h2>

        <div class="columns" >

          <div class="column is-6 ">
            <div class="field">
              <input type="text" 
                    class="input" 
                    v-model="title" 
                    v-bind:class="{'is-warning':titleField && attemptPost}" 
                    placeholder="Title">
              </input>
              <div class="is-warning" v-if="titleField && attemptPost">This field is required.</div>
            </div>
            <div class="field">
              <textarea class= "textarea" 
                      name="name" 
                      rows="8" 
                      cols="80" 
                      v-model="description" 
                      v-bind:class="{'is-warning':contentField && attemptPost}"
                      placeholder="Post content">
              </textarea>
              <div class="is-warning" v-if="contentField && attemptPost">This field is required.</div>
            </div>
            <v-multiselect v-model="tags"></v-multiselect>
            <button class= "button is-success" type="button" name="button" v-on:click="addNewPost()" >Post it</button>
          </div>
          <div class="column is-6">
            
            <h2 class="subtitle has-text-centered ">
              <span class="icon">
                <i class="fa fa-home"></i>
              </span>
              <a @click="getAllPosts()"> Posts </a>
            </h2>
            <div v-for="post in posts">
              <div class="">
                <div class=" ">
                  <p class="title is-4">
                    {{ post.title}}
                  </p>
                </div>
                <div class="content">
                  <p>{{ post.description }}</p>
                </div>
                <b-field grouped group-multiline> 
                  <div v-for="(value, key, index) in post.tags">
                    <span class="multiselect__tag">
                      <a class="link-tag" @click="findAllByTag(value)">
                        <span>{{value.name}}</span>
                      </a>
                    </span>
                  </div>
                </b-field>
                <footer >
                  <i class="is-small content">
                    <div v-if="post.updateDateFormat == '' ">
                      Posted at <time>{{post.creationDateFormat}}</time> 
                    </div>
                    <div v-else>
                      Update at <time>{{post.updateDateFormat}}</time>
                    </div>
                    
                    by <b>{{post.author.name}}</b>
                  </i>
                </footer>
                <a class="button is-warning" @click="isComponentModalActive = true">
                  <span>Edit</span>
                  <span class="icon is-small">
                    <i class="fa fa-edit"></i>
                  </span>
                </a>
                <b-modal :active.sync="isComponentModalActive" has-modal-card>
                  <v-update-post v-bind="post"></v-update-post>
                </b-modal>
                <a class="button is-danger" @click="deletePost(post)">
                  <span>Delete</span>
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                </a>
              </div>
              </br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import axios from 'axios';
import UpdatePost from './UpdatePost.vue';
import Multiselect from './Multiselect.vue';

export default {
  data(){
    return {
      isComponentModalActive: false,
      description: '',
      title: '',
      creationDateFormat: '',
      posts:[ 
      ],
      errors:[

      ],
      tags:[

      ],
      attemptPost: false
    }
  },
  computed:{
    titleField : function (){
      return this.isNotEmpty(this.title);
    },
    contentField : function(){
      return this.isNotEmpty(this.description);
    }
  },
  components:{
    'v-update-post': UpdatePost,
    'v-multiselect': Multiselect
  },
  mounted(){
    this.getAllPosts()
  },
  methods:{ 
    addNewPost: function(){
      this.attemptPost = true;
      self = this;
      if(!this.titleField && !this.contentField){
        axios.post('http://localhost:8081/api/v1/post',{
          description : this.description,
          title: this.title,
          tags: this.tags
        }).then(function(response){
          self.posts.push(response.data);
          self.title = '';
          self.description = '';
          // Send to child (Multiselect) to clean
          self.$emit('tags', []);
        }).catch(function(error){
          console.log(error);
        });
      }else{
        this.$toast.open({
          duration: 5000,
          message: "Some fields are required.",
          type: "is-danger"
        });
      }

    },
    getAllPosts : function(){
      axios.get('http://localhost:8081/api/v1/posts')
        .then(response => {
          this.posts = response.data
        })
        .catch(e =>{
          this.errors.push(e)
        });
    },
    deletePost: function(post){
      self = this;
      // this.$dialog is from Buefy
      this.$dialog.confirm({
        title: 'Deleting post',
        message: 'Are you sure you want to <b>delete</b> this post? This cannot be done.',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => axios.delete("http://localhost:8081/api/v1/post/"+post.id)
          .then(response =>{
            self.posts.pop(post)
            // TODO make a better remove item list
            self.$toast.open({
              message:'Post deleted!',
              type: 'is-success'
            });
          })
          .catch(e =>{
            console.log(e);
          })
      }) 
    },
    isNotEmpty: function (field){
      return field === '';
    },
    findAllByTag : function(value){
      self = this;
      axios.post("http://localhost:8081/api/v1/post/tag",{
        id: value.id
      }).then(response => {
        this.posts = response.data;
      }).catch(error =>{
        console.log(error);
      })
    }
  },
  created(){
    // get value from child component and add to tags from parent component
    this.$root.$on('tags', (tags) => {
    	this.tags = tags;
    })
  }
}
</script>

<style>
a.link-tag { color: inherit; } 
</style>
