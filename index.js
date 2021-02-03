firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
      document.getElementById("user_div").addEventListener('submit',getStatus)

    }


  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function getStatus(e){
  e.preventDefault();

  console.log(123);
}

function logout(){
  firebase.auth().signOut();
}

function SelectAllData(){
  firebase.database().ref('eambulance').once('value',
  function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var name1 = CurrentRecord.val().name;
        var age1 = CurrentRecord.val().age;
        var gender = CurrentRecord.val().sex;
        var blreq = CurrentRecord.val().blood_req;
        var bl = CurrentRecord.val().blood;
        var ven = CurrentRecord.val().ventilator;
        AddItemstoTable(name1,age1,gender,blreq,bl,ven);
      }
    );
  })
}

window.onload = SelectAllData;

function AddItemstoTable(name1,age1,gender,blreq,bl,ven){
  var tbody = document.getElementById('tbody1');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  td1.innerHTML = name1;
  td2.innerHTML = age1;
  td3.innerHTML = gender;
  td4.innerHTML = blreq;
  td5.innerHTML = bl;
  td6.innerHTML = ven;
  trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5); trow.appendChild(td6);
  tbody.appendChild(trow);
}
