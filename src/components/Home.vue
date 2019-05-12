<template>
    <div class = "questionClass">
      <section>
        <div class="title">
        <h1>{{currentQuestion.question}}</h1>
      </div>
      <div class="optionTable">
        <ul id="options">
          <button @click="handleSelectedOption" v-for="item in currentQuestion.options">
            {{ item }}
          </button>
        </ul>
      </div>
      </section>
    </div>
</template>

<script>
    // const fb = require('../firebaseConfig.js')
    import { mapState } from 'vuex'

    export default {
      computed:{
       ...mapState(['currentUser','currentQuestion'])
     },
     methods:{
       handleSelectedOption(){
         
       }
     }
    }

</script>



<!-- // console.log(fb.db.collection("results"));
// var question = fb.db.collection("questions").doc("kWxQN5ffi8quue0zOGuh").collection("responses").doc

// var questionsRef = fb.db.collection("questions")


//    fb.db.collection('questions')
//    .where('questionID', '==', '1')
//    .get()
//    .then(function(querySnapshot) {
//      querySnapshot.forEach(function(doc) {
//    console.log(doc.id, " => ", doc.data());
//    });
//  })
// .catch(function(error) {
//   console.log("Error getting documents: ", error);
//  });

// var query = questionsRef.where("questionID", "==", true)

// console.log(query)

// async getMarkers() {
//   var markers = [];
//   fb.db.collection("results").get()
//     .done(function() {
//     querySnapshot.docs.forEach(doc => {
//       markers.push(doc.data());
//     });
//   });
//   return markers;
// }

// question.get().then(function(doc) {
//   if (doc.exists) {
//     //var result = getMarkers();
//     //console.log(getMarkers());
//     console.log("Document data:", doc.data());
//   } else {
//     // doc.data() will be undefined in this case
//   console.log("No such document!");
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// }); -->
