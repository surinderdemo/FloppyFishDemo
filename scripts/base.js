//------------Firebase Data Writes-----------------
var firebaseRef = new Firebase("https://geoalarm.firebaseio.com/");
function initializeDB(){
    firebaseRef.set({
        users: {demo: {locale:'mobile'},admin:{locale:'desktop'}},
        numofusers: 0
    });
}
function alarmAdd(alarmObj,usr) {
    var usrs = firebaseRef.child(usr);
    var post = usrs.push(alarmObj, function(error) {
        if (error) {
            console.log("Alarm could not be saved. " + error);
        }
    });
    return post.key();
}
function alarmAddHelper(data){
    return alarmAdd({on:data.stat,location:data.loc,timeStart:data.start,timeEnd:data.end,days:data.days,repeat:data.rep},'users/'+data.user);
}
function alarmDelete(alarmID,usr){
    var alrm = firebaseRef.child(usr);
    alrm.child(alarmID).on('value',function(snapshot){
        alrm.child(alarmID).remove(function(error){
            if(error){
                console.log("Deletion failed. " + error);
            }
        });
    });
}
/* on page load */
$(document).ready(function() {
    initializeDB();
    //Addind an alarm will return an id that you should assign to the alarm object in the front end
    var id = alarmAddHelper({user:"demo",stat:true,loc:"Yale University",start:"9:00am",end:"2:00pm",days:"Monday,Tuesday",rep:false});
    alarmDelete("-","users/demo/");
});

/* Loading Script */
$(window).load(function() {
  "use strict";
      $(".loader").delay(500).fadeOut();
      $("#mask").delay(1000).fadeOut("slow");
});


/*
var myFirebaseRef = new Firebase("https://geoalarm.firebaseio.com/");
myFirebaseRef.set({
  title: "Alarm 1",
  author: "Yash",
  location: {
    city: "New Haven",
    state: "MA",
    zip: 94103
  },
  members: null
});
var usersRef = myFirebaseRef.child("members");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
},function(error){
  if (error) {
    console.log("Data could not be saved." + error);
  }
});*/