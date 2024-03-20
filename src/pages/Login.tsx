import {useState} from 'react';
import styles from "../pages/Login.module.css";
import InputControl from './InputControl';
import { Link , useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../api/firebase';
import { UserDetails } from '../shared/modal';

function Login() {

    const navigate=useNavigate();
    const [values,setValues]=useState({
        email:"",
        pass:"",
    });

    const [errorMsg,setErrorMsg]=useState("");

    const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

    const handleSubmission=()=>{
        if (!values.email || !values.pass){
            setErrorMsg("Please fill all the fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth,values.email,values.pass)
        .then(async(res: any)=>{
            const user: UserDetails = {
                displayName: res.user.displayName,
                email: res.user.email,
                accessToken: res.user.accessToken,
            }
            localStorage.setItem("user", JSON.stringify(user))

            setSubmitButtonDisabled(false);
            navigate("/");
        }
        ).catch((err)=>{
            setSubmitButtonDisabled(false);
            setErrorMsg(err.message);
            });
    }




  return (
    <div className={styles.container}>
        <div className={styles.innerBox}>
            <h1 className={styles.heading}>Login</h1>

            <InputControl label="Email" 
            onChange={(event:any)=>setValues((prev)=>({...prev,email:event.target.value}))
        }
            placeholder="Enter Your EMail Address"/>
            <InputControl label="Password" 
             onChange={(event:any)=>setValues((prev)=>({...prev,pass:event.target.value}))
            }
            placeholder="Enter Your Password"/>

            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
                <p>Create an account?{" "}
                    <span>
                        <Link to="/signup">Sign up</Link>
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login