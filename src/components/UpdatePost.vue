<template>
  <form action="">
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Edit Post</p>
        </header>
        <section class="modal-card-body">
            <b-field label="Title">
                <input type="text" class="input" placeholder="Title" v-model="title"></input>
            </b-field>
            <b-field label="Content">
                <textarea class= "textarea" name="name" v-model="description" rows="8" cols="80"  placeholder="Post content"></textarea>
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
    props:['title','description','id'],
    methods:{
        updatePost: function(){
            const updatedPost = new Object();
            updatedPost.description = this.description;
            updatedPost.title = this.title;
            updatedPost.id = this.id;
            this.$http.put(
                'api/v1/post', updatedPost
            ).then(function (response) {
                console.log(response);
            }).catch(function(error){
                console.log(error);
            })
        }
    }
}
</script>
<style>

</style>


