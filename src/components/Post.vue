<template>
  <section class="tites">
    <div class="hero-body">
      <div id="app" class="container">
        <h1 class="title">Blog Vuejs</h1>
        <h2 class="subtitle">This is a mini blog using vuejs and bulma</h2>

        <div class="columns" >

          <div class="column is-6 " v-show="$auth.check()">
            <div class="field">
              <input type="text" 
                    class="input" 
                    v-model="title" 
                    :class="{'is-warning':titleField && attemptPost}" 
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
                      :class="{'is-warning':contentField && attemptPost}"
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
                  <div v-for="value in post.tags">
                    <span class="multiselect__tag">
                      <a class="link-tag" @click="findAllByTag(value)">
                        <span>{{value.name}}</span>
                      </a>
                    </span>
                  </div>
                </b-field>
                <footer >
                  <i class="is-small content">
                    <div v-if="post.updateDateFormat == '' || post.updateDateFormat == null">
                      Posted at <time>{{post.creationDateFormat}}</time> 
                    </div>
                    <div v-else>
                      Update at <time>{{post.updateDateFormat}}</time>
                    </div>
                    
                    by <b>{{post.user.username}}</b>
                  </i>
                </footer>
                <div v-show="$auth.check()">
                  <a class="button is-warning" @click="isComponentModalActive = true">
                    <span>Edit</span>
                    <span class="icon is-small">
                      <i class="fa fa-edit"></i>
                    </span>
                  </a>
                  <b-modal :active.sync="isComponentModalActive" has-modal-card>
                    <v-update-post :post="post"></v-update-post>
                  </b-modal>
                  <a class="button is-danger" @click="deletePost(post)">
                    <span>Delete</span>
                    <span class="icon is-small">
                      <i class="fa fa-times"></i>
                    </span>
                  </a>
                </div>
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
      let vm = this;
      if(!this.titleField && !this.contentField){
        const newPost = new Object();
        newPost.description = this.description;
        newPost.title = this.title;
        newPost.tags = this.tags;
        this.$http.post('api/v1/post',
         newPost
        ).then(function(response){
          vm.posts.push(response.data);
          vm.title = '';
          vm.description = '';
          // Send to child (Multiselect) to clean
          vm.$emit('tags', []);
          vm.tags = [];
          this.$toast.open({
            duration: 2000,
            message: "New post added!",
            type: "is-success"
          });

        }).catch(function(error){
          this.$toast.open({
            duration: 3000,
            message: "Error to create a new post!",
            type: "is-danger"
          });
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
      this.$http({
          url: 'api/v1/posts',
          method: 'GET'
        })
        .then(response => {
          this.posts = response.data
        })
        .catch(e =>{
          this.errors.push(e)
        });
    },
    deletePost: function(post){
      let vm = this;
      // this.$dialog is from Buefy
      this.$dialog.confirm({
        title: 'Deleting post',
        message: 'Are you sure you want to <b>delete</b> this post? This cannot be done.',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => 
          this.$http
          .delete('api/v1/post/' + post.id)
          .then(response =>{
            vm.posts.pop(post)
            // TODO make a better remove item list
            vm.$toast.open({
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
      let vm = this;
      this.$http.post(
          'api/v1/post/tag',value.id)
      .then(response => {
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
