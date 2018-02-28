<template>
    <section class="hero">
        <div class="hero-body">
            <div class="columns">
                <div class="column is-half is-4 is-offset-one-quarter ">
                    <form v-on:submit.prevent="login()">
                        <div class="field">
                            <input type="text" 
                                class="input"
                                placeholder="Name"
                                v-model="data.body.username" 
                                />
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

        </div>
    </section>
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
                rememberMe:false,
                fetchUser: true
            }
        }
        
    },
    mounted(){
        console.log(this.$auth.redirect());
    },
    methods:{
        login(){
            var redirect = this.$auth.redirect();

            this.$auth.login({
                method: 'post',
                body: this.data.body, 
                data: this.data.body,
                rememberMe: this.data.rememberMe,
                redirect:{
                    name: redirect ? redirect.from.name: 'posts'
                },
                fetchUser: this.data.fetchUser
            })
            .then(function(data){
                console.log('Success: '+ data)
            }).catch((error) =>{
                console.log(error.data)
            })
        }
    }
}    
</script>
