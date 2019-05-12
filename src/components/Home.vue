<template>
    <div id="questions">
      <section>
        <h1>Questions Page</h1>
        <h2>What is the sum of 10+5?</h2>
        <ul>
        <li>5</li>
        <li>10</li>
        <li>15</li>
        <li>20</li>
        </ul>
      </section>
    </div>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    console.log(fb.db.collection("results"));
    var question = fb.db.collection("results").doc("zdBdlNLdFeU1B3z7QTZZ");

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

    question.get().then(function(doc) {
      if (doc.exists) {
        //var result = getMarkers();
        //console.log(getMarkers());
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
      console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
</script>
