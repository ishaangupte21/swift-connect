const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.createUserNode = functions.https.onCall(async (data, context) => {
    try {
        const { uid, username, name, email } = data;
        await admin.auth().updateUser(uid, {
        displayName: username,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/social-media-app-f1328.appspot.com/o/profile_pictures%2Fdefault_profile_pic.webp?alt=media&token=4247d84f-d2e1-4c54-a27f-b4159f75102d'
    })
    return admin.firestore().collection('users').doc(uid).set({
        uid,
        username,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/social-media-app-f1328.appspot.com/o/profile_pictures%2Fdefault_profile_pic.webp?alt=media&token=4247d84f-d2e1-4c54-a27f-b4159f75102d',
        usernameChanged: Date.now(),
        dateJoined: Date.now(),
        email,
        posts: [],
        followers: [],
        following: [],
        name
    })
    } catch (err) {
        console.error(err.message)
        throw new functions.https.HttpsError('internal', err.message)
    }
})

exports.deleteUserNode = functions.auth.user().onDelete(async user => {
    try {
        const posts = await admin.firestore().collection('posts').where('uid', '=-', user.uid).get()
        if(posts.size !== 0) {
            posts.forEach(async post => {
                await admin.firestore().collection('posts').doc(post.id).delete()
            })
        }

         return admin.firestore().collection('users').doc(user.uid).delete()
    }catch (err) {
        console.error(err.message)
        throw new functions.https.HttpsError('internal', err.message)
    }
})

exports.resizeImage = functions.storage.object().onFinalize(async object => {
    try {
        const path = object.bucket
        console.log(path)
        return 'completed'
    } catch (err) {
        console.error(err.message)
        throw new functions.https.HttpsError('internal', err.message)
    } 
})

exports.likePost = functions.https.onCall(async (data, context) => {
   try {
    if(!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to like a post')
    }

    const {postId} = data

    const postData = (await admin.firestore().collection('posts').doc(postId).get()).data()


    if(postData.likes.includes(context.auth.uid)) {
        //unlike
        return admin.firestore().collection('posts').doc(postId).update('likes', admin.firestore.FieldValue.arrayRemove(context.auth.uid))
    } else {
        //like
        return admin.firestore().collection('posts').doc(postId).update('likes', admin.firestore.FieldValue.arrayUnion(context.auth.uid))
    }

   } catch (err) {
        console.error(err.message)
        throw new functions.https.HttpsError('internal', err.message)
   }
})

exports.editAccount = functions.https.onCall(async (data, context) => {
    try {
       if(!context.auth) {
            throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to like a post')
       }

       const {username, name, profilePic} = data
       const uid = context.auth.uid

       if(username === '' && profilePic === null) {
           //no username and profilepic
        return admin.firestore().collection('users').doc(uid).update({

            name
        })
       } else if (username === '' && profilePic !== null ) {
           
            //no username

            await admin.auth().updateUser(uid, {
                photoURL: profilePic,
            
            })
 
            return admin.firestore().collection('users').doc(uid).update({
                photoURL: profilePic,
                name
            })
       } else if (username !== '' && profilePic === null) {
        //    no profile pic
        await admin.auth().updateUser(uid, {
            displayName: username
        })

        return admin.firestore().collection('users').doc(uid).update({
            username,
            name
        })
       } else {
           //both of them

           await admin.auth().updateUser(uid, {
               photoURL: profilePic,
               displayName: username
           })

           return admin.firestore().collection('users').doc(uid).update({
               username,
               photoURL: profilePic,
               name
           })
       }

    } catch (err) {
        console.error(err.message)
        throw new functions.https.HttpsError('internal', err.message)
    }
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
