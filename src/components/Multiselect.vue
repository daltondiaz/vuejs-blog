<template>
    <div class="field">
        <multiselect v-model="value" 
                label="name"
                track-by="name"
                :options="options" 
                :multiple="true"
                :searchable="true"
                :taggable="true"
                placeholder="Select some tags"
                tag-placeholder="Add this as new tag"
                @tag="addTag"
                @input="onChange"
                 >
        <span slot="noResult">Oops! No tag found.</span>
        </multiselect>
    </div>
</template>
<script>

import axios from 'axios';
import Mutliselect from 'vue-multiselect';

export default{
    data(){
        return{
            value: [],
            options:[
            ]
        }
    },
    components:{
        'multiselect': Mutliselect
    },
    mounted(){
        this.getAllHashtags();
    },
    methods:{
        getAllHashtags : function(){
            axios.get('http://localhost:8081/api/v1/tags')
                .then(response =>{
                    this.options = response.data;
                })
                .catch(error =>{
                    console.log(error)
                });
        },
        addTag: function(newTag){
            const tag ={
                name : newTag,
                description: newTag,
                id: 0
            }
            this.options.push(tag)
            this.value.push(tag)
        },
        // send hashtags to parent component 
        onChange: function(){
            this.$root.$emit('tags',this.value);
        }
    },
    created(){
        // assigment to value from parent action
        this.$parent.$on('tags',(value) =>{
            this.value = value;
        })
    }
}
</script>
<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>

