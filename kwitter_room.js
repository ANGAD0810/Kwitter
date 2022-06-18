 const firebaseConfig = {
 apiKey: "AIzaSyDkzafFLCQ0NIk_Or16mxndqXrKeBsAtms",
  authDomain: "kwitter-7b7dd.firebaseapp.com",
  databaseURL: "https://kwitter-7b7dd-default-rtdb.firebaseio.com",
  projectId: "kwitter-7b7dd",
  storageBucket: "kwitter-7b7dd.appspot.com",
  messagingSenderId: "496782276563",
  appId: "1:496782276563:web:b837407d6f424d2df92126"}
 firebase.initializeApp(firebaseConfig);
 user_name = localStorage.getItem("user_name");
 document.getElementById("user_name").innerHTML = "Welcome  " + user_name + "!!!";

 function addRoom() {
   room_name = document.getElementById("room_name").value;
   firebase.database().ref("/").child(room_name).update({
     purpose: "adding room name"
   });
   localStorage.setItem("room_name", room_name);
   window.location = "kwitter_page.html";
 }


 function getData() {
   firebase.database().ref("/").on('value', function (snapshot) {
     document.getElementById("output").innerHTML = "";
     snapshot.forEach(function (childSnapshot) {
       childKey = childSnapshot.key;
       Room_names = childKey;

       console.log("Room Name - " + Room_names);
       row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomname(this.id)'>#" + Room_names + "</div><hr>";
       document.getElementById("output").innerHTML += row;

     });
   });
 }
 getData();

 function redirectToRoomname(name) {
   console.log(name);
   localStorage.setItem("room_name", name);
   window.location = "kwitter_page.html";

 }

 function signout() {
   localStorage.removeItem("user_name");
   localStorage.removeItem("room_name");
   window.location = "index.html";

 }