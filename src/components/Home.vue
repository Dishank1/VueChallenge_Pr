<template>
    <div class = "questionClass">
        <div class="title">
        <h1>{{currentQuestion.question}}</h1>
      </div>
      <div class="optionTable">
        <ul id="options"  v-for="item in currentQuestion.options">
          <button @click="handleSelectedOption(item)" height="100px" width="100px">
            {{ item }}
          </button>
        </ul>
      </div>
    </div>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    import { mapState } from 'vuex'

    export default {
      data:{
        showResults : false,
        performingLoad : false
      },
      computed:{
       ...mapState(['currentUser','currentQuestion'])
     },
     methods:{
       handleSelectedOption(item){
       fb.db.collection('questions').doc("kWxQN5ffi8quue0zOGuh").collection('responses').add({
         emailID: this.currentUser.email,
         selectedResponse: item
        }).then(() => {
           this.performingLoad = false
           this.showResults = true
           // this.$router.push('/Results')
           }).catch(err => {
             this.errorMessage = err.message
             this.performingLoad = false
           })
       }
     }
    }

</script>
