<template>
  <section class="tites">
    <br>
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
      <p class="level-item has-text-centered">
         <router-link :to="{name:'login'}" class="link is-info">Login</router-link>
      </p>
    </nav>
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


</script>

<style>
a.link-tag { color: inherit; } 
</style>
