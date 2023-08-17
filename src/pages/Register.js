import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import Add from '../images/icons8-add-image-48.png'
import {useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {auth, db, storage} from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        console.log('Display name:',displayName);
        const email = e.target[1].value;
        console.log('email:',email);
        const password = e.target[2].value;
        console.log('password:',password);
        const file = e.target[3].files[0];
        console.log('file:',file);


        try {
            // Create user using provided email and password
            const res = await createUserWithEmailAndPassword(auth, email,password);
            console.log(res);
            // Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
            console.log("storage ref:"+ storageRef);

            const metadata = {
                contentType: file.type // Set the content type based on the uploaded file
              };
            // Upload image to Firebase Storage
            await uploadBytesResumable(storageRef, file,metadata).then(() => {
               
                // Get the download URL of the uploaded image
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        // Update the user's profile with display name and photoURL
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        // Create user data in Firestore collection 'users'
                        await setDoc(doc(db,"users", res.user.uid),{
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        // Create an empty user chats document in Firestore collection 'userChats'
                        await setDoc(doc(db, "userChats" , res.user.uid),{});
                        navigate('/login')

                    } catch (error) {
                        console.log(error);
                        setErr(true);
                        setLoading(false);
                    }
                })
            })


        } catch (error) {
            console.log("Error:", error);
            setErr(true);
            setLoading(false);
        }

    }

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">What's Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="display name" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <input required type="file" id="file" style={{display: "none"}} />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading and compressing the image and please wait"}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    Have an account? <Link to="/register">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
