<template>
  <form action="">
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit Post</p>
        </header>
        <section class="modal-card-body">
            {{ post.id }}
            <b-field label="Title">
                <input type="text" class="input" placeholder="Title" v-model="post.title"/>
            </b-field>
            <b-field label="Content">
                <textarea class= "textarea" name="name" v-model="post.description" rows="8" cols="80"  placeholder="Post content"></textarea>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="updatePost">Save</button>
        </footer>
    </div>
  </form>
</template>
<script>

export default {
    props:['post'],
    methods:{
        updatePost: function(){
            let updatedPost = new Object();
            updatedPost = this.post;
            this.$http.put(
                'api/v1/post', updatedPost
            ).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
            console.log("Update");
        }
    }
}
</script>
<style>

</style>


