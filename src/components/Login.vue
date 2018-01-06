<template>
  <div class="columns">
    <div class="column is-half is-4 is-offset-one-quarter ">
        <form v-on:submit.prevent="login()">
            <div class="field">
                <input type="text" 
                    class="input"
                    placeholder="Name"
                    v-model="data.body.username" 
                    >
                    </input>
            </div>
            <b-field>
                <b-input type="password"
                    placeholder="Password"
                    v-model="data.body.password" 
                    >
                    </b-input>
            </b-field>
            <div class="field">
                <b-switch v-model="data.rememberMe"
                type="is-info">
                    Remember-me
                </b-switch>
                <div class="field">
                    <button class="button is-success" type="submit  " name="button">Sign in</button>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>
<script>
export default{
    data(){
        return {
            context: 'login context',
            data: {
                body:{
                    username:'',
                    password:''
                },
                rememberMe:false
            }
        }
        
    },
    methods:{
        login(){
            var redirect = this.$auth.redirect();

            this.$auth.login({
                method: 'post',
                body: this.data.body, //
              //  data: this.data.body,
                headers: {
                    'Content-Type': 'application/json'
                },
                rememberMe: this.data.rememberMe,
                redirect:{
                    name: redirect ? redirect.from.name: 'posts'
                },
                url: 'http://localhost:8082/auth/login',
             //   fetchUser: false,
            })
            .then(() => {
                console.log('Success')
            }).catch((error) =>{
                console.log(error.data)
            })
        }
    }
}    
</script>
