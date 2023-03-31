import React from 'react'
import './App.css';
import { auth, db } from './firebase/init'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = React.useState({});

  //skeleton:
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "Finish firebase",
      description: "Finish firebase video",
      uid: user.uid,
    }
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const {docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id)
    
    const postSnap = await getDoc(postRef)
    return postSnap.data()
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const {docs} = await getDocs(postCollectionRef)
    console.log(docs.map(doc => doc.data()))
  }

  async function updatePost() {
    const hardCodedId = "uupu2GR1NUJMyQtIElGG"
    const postRef = doc(db, "posts", hardCodedId)

    const post = await getPostById(hardCodedId)

    const newPost = {
      ...post,
      title: "Land a crazy 500k job"
    };

    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "uupu2GR1NUJMyQtIElGG"
    const postRef = doc(db, "posts", hardCodedId)

    deleteDoc(postRef)
  }



  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setUser(user)
      }
    })
  },[])

  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({user}) => {
      console.log(user)
      setUser(user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function logout() {
    signOut(auth)
    setUser({})
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post by Id</button>
      <button onClick={getPostByUid}>Get Post by Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
