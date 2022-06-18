const firebaseConfig = {
      apiKey: "AIzaSyDkzafFLCQ0NIk_Or16mxndqXrKeBsAtms",
      authDomain: "kwitter-7b7dd.firebaseapp.com",
      databaseURL: "https://kwitter-7b7dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-7b7dd",
      storageBucket: "kwitter-7b7dd.appspot.com",
      messagingSenderId: "496782276563",
      appId: "1:496782276563:web:b837407d6f424d2df92126"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        n_tag = "<h4> " + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
                        m_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
                        l_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value=" + like + " onclick = 'updateLike(this.id);'>";
                        s_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";
                        row = n_tag + m_tag + l_button + s_tag;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function signout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database(). ref(room_name).child(message_id).update({
            like: updated_likes
      });   
}