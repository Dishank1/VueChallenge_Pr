<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="home"><h3>Home</h3></router-link>
                <ul class="inline">
                    <li><router-link to="settings">Settings</router-link></li>
                    <li><a @click="logout">Logout</a></li>
                </ul>
            </div>
        </section>
    </header>
</template>
<script>
  const fb = require('../firebaseConfig.js')

  export default {
    methods: {
      logout() {
        fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
