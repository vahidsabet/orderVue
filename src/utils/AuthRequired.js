import { isAuthActive } from '../constants/config';
import firebase from 'firebase/app'
import 'firebase/auth'

export default (to, from, next) => {
  //if(localStorage.getItem('user') != null)
  //next('/app');

  /*firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log('====================================');
          console.log("user"+providerData);
          user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });
          console.log('====================================');
          next('/app');
          // ...
        } else {
          next('/user/login');
          // User is signed out.
          // ...
        }
      });*/
 /*var user = firebase.auth().currentUser;

      if (user) {
        next('/');
      } else {
        localStorage.removeItem('user')
        next('/user/login')
      }*/
  if (isAuthActive){
    if (localStorage.getItem('user') == null) {
   
    //  this.$notify("error", "دسترسی غیر مجاز", "", { duration: 3000, permanent: false });
      next('/user/login')
    console.log("users:vas");
    }
    else{
       console.log("users:no null");
     // next();
    }
   // console.log("no users:");
   next();
  }else{
  
    if (localStorage.getItem('user') != null && localStorage.getItem('user').length > 0) {
      // verify with firebase or jwt
         
 // var user = firebase.auth().currentUser;
    //var user = firebase.auth().currentUser;

    console.log("users in:"+user);
      if (user) {
        next('/app');
      } else {
        localStorage.removeItem('user')
        next('/user/login')
      }
    
    } else {
      localStorage.removeItem('user')
      next('/user/login')
    }
  }
}
