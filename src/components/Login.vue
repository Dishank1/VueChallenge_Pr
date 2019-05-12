<template>
    <div id="login">
      <transition name="fade">
        <div v-if="performingLoad" class="loading">
            <p>Loading...</p>
        </div>
      </transition>
        <section>
            <div class="col1">
                <h1>Vuegram</h1>
                <p>Welcome to the <a href="https://savvyapps.com/" target="_blank">Savvy Apps</a> sample social media web app powered by Vue.js and Firebase.
                    Build this project by checking out The Definitive Guide to Getting Started with Vue.js</p>
            </div>
            <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
              <form v-if ="showLoginForm" @submit.prevent>
                  <h1>Welcome Back</h1>

                  <label for="email1">Email</label>
                  <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                  <label for="password1">Password</label>
                  <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                  <button @click="login" class="button">Log In</button>

                  <div class="extras">
                    <a @click="togglePasswordReset">Forgot Password</a>
                    <a @click="toggleForm">Create an Account</a>
                  </div>
              </form>
              <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                <h1>Get Started</h1>

                <label for="name">Name</label>
                <input v-model.trim="signupForm.name" type="text" placeholder="Name" id="name" />

                <label for="email2">Email</label>
                <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

                <label for="password2">Password</label>
                <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

                <button @click="signup" class="button">Sign Up</button>

                <div class="extras">
                  <a @click="toggleForm">Back to Log In</a>
                </div>
              </form>
              <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                <div v-if="!passwordResetSuccess">
                  <h1>Reset Password</h1>
                  <p>We will send you an email to reset your password</p>

                  <label for="email3">Email</label>
                  <input v-model.trim="resetPasswordForm.email" type="text" placeholder="you@email.com" id="email3" />

                  <button @click="resetPassword" class="button">Submit</button>

                  <div class="extras">
                    <a @click="togglePasswordReset">Back to Log In</a>
                  </div>
                </div>
                <div v-else>
                <h1>Email Sent</h1>
                <p>check your email for a link to reset your password</p>
                <button @click="togglePasswordReset" class="button">Back to login</button>
              </div>
            </form>
              <transition name="fade">
                <div v-if="errorMessage !== ''" class="error-msg">
                    <p>{{ errorMessage }}</p>
                </div>
              </transition>
            </div>
        </section>
    </div>
</template>

<script>
    const fb = require('../firebaseConfig.js')

    export default {
      data() {
        return {
          loginForm: {
          email: '',
          password: ''
          },
          signupForm: {
            name: '',
            email: '',
            password: ''
          },
          resetPasswordForm: {
            email: ''
          },
          showLoginForm: true,
          showForgotPassword: false,
          performingLoad: false,
          passwordResetSuccess: false,
          errorMessage: ''
        }
      },
      methods:{
        toggleForm(){
          this.showLoginForm = !this.showLoginForm
        },
        togglePasswordReset() {
          if (this.showForgotPassword) {
            this.showLoginForm = true
            this.showForgotPassword = false
            this.passwordResetSuccess = false
          }else {
            this.showLoginForm = false
            this.showForgotPassword = true
          }
        },
        login() {
          this.performingLoad = true

          fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
              this.$store.commit('setCurrentUser', user.user)
              this.$store.dispatch('fetchUserProfile')
              this.$store.dispatch('fetchQuestion')
              this.performingLoad = false
              this.$router.push('/home')
          }).catch(err => {
            this.errorMessage = err.message
            this.performingLoad = false
          })
        },
        signup() {
          this.performingLoad = true

          fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
            const newUser = user.user
            this.$store.commit('setCurrentUser', newUser)
              // create user obj
            fb.usersCollection.doc(newUser.uid).set({
              displayName: this.signupForm.name
            }).then(() => {
              this.$store.dispatch('fetchUserProfile')
              this.$store.dispatch('fetchQuestion')
              this.performingLoad = false
              this.$router.push('/home')
              }).catch(err => {
                this.errorMessage = err.message
                this.performingLoad = false
              })
          }).catch(err => {
            console.log(err)
          })
        },
        resetPassword() {
          this.performingRequest = true

          fb.auth.sendPasswordResetEmail(this.resetPasswordForm.email).then(() => {
            this.performingLoad = false
            this.passwordResetSuccess = true
            this.resetPasswordForm.email = ''
          }).catch(err => {
            //console.log(err)
            this.performingLoad = false
            this.errorMessage = err.message
          })
        }
      }
    }
</script>
