<template>
  <section class="tites">
    <div v-if="$auth.ready() && loaded">
      <nav class="level">
        <p class="level-item has-text-centered">
          <router-link :to="{name:'home'}">Home</router-link> 
        </p>
        <p class="level-item has-text-centered">
          <router-link :to="{name:'posts'}">Posts</router-link> 
        </p>
        <p class="level-item has-text-centered">
          <router-link :to="{name:'about'}" class="link is-info">About</router-link>
        </p>
        <p class="level-item has-text-centered">
          <a class="link is-info">Contact</a>
        </p>
        <span v-show="!$auth.check()">
          <p class="level-item has-text-centered">
            <router-link :to="{name:'login'}" class="link is-info">Login</router-link>
          </p>
        </span>
        <span v-show="$auth.check()">
          <p class="level-item has-text-centered">
            <router-link :to="{name:'account'}" class="link is-info">My Account</router-link>
          </p>
          <p class="level-item has-text-centered">
            <a v-on:click="logout()" href="javascript:void(0);" >Logout</a>
          </p>
        </span>
      </nav>
    </div>
    <router-view></router-view>   
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  data(){
    return{
      context: 'app context',
      loaded: false
    }
  },
  mounted(){
    var _this = this;
    setTimeout(function(){
      _this.loaded = true;
    }, 500);
  },
  created() {
    var _this = this;

    this.$auth.ready(function () {
        console.log('ready ' + this.context);
    });
  },
  methods:{
    logout(){
      this.$auth.logout({
        makeRequest: true,
        success(){
          console.log('success');
        },
        error(){
          console.log('error');
        }
      })
    }
  }
}

</script>

<style>
a.link-tag { color: inherit; } 
</style>
