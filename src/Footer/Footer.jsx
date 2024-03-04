import { useEffect,useState } from "react";
import "./Footer.css";
import { Link , useNavigate } from "react-router-dom";
import { MdHome , MdMovie } from "react-icons/md";
import { FaSearch,FaYoutube } from "react-icons/fa";
import { RiSpyFill } from "react-icons/ri";
import {IoIosVideocam } from "react-icons/io";
import { BsFillPersonFill,BsCCircle } from "react-icons/bs";
import { AiOutlineLinkedin,AiOutlineInstagram,AiOutlineGithub } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Swal from 'sweetalert2'
import Login from "../Main/login";
export default function Footer(){
    const navigate = useNavigate();
    const [user, setIsAuthenticated] = useState(false);
    const [loginpop,setloginpop] = useState(false);
    const firebaseConfig = {
        apiKey: "AIzaSyBOwu1HGOc2LTTjalwwhwEkM16EdziUyEE",
        authDomain: "free-netflix-7e3cf.firebaseapp.com",
        projectId: "free-netflix-7e3cf"
    };
    firebase.initializeApp(firebaseConfig);
    useEffect(() => {
        // Add an authentication state observer
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            setIsAuthenticated(true);
          } else {
            // User is signed out
            setIsAuthenticated(false);
          }
        });
    
        // Clean up the observer when component unmounts
        return () => {
          unsubscribe();
        };
      }, []);
      function navlogout() {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to logout...",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Logout'
        }).then((result) => {
          if (result.isConfirmed) {
              firebase.auth().signOut();
              navigate(`/`);
          }
        })
  }
  function loginpophandel(){
    if(loginpop){
      setloginpop(false);
    }
    else{
      setloginpop(true);
    }
  }
    return(
        <>
        <footer className="hero">
          <div className="container flex">
            <div className="container__about">
            <h2>About Me</h2>
            <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nam reprehenderit aut eius cumque possimus, hic a eveniet delectus quasi magnam cum, harum provident perferendis. Nobis id consequuntur eligendi est?
            </p>
          </div>
          <div className="container-pages flex">
            <div className="container__recentpages">
                <h2>Free Netflix</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                <ul>
                    <li><Link to="/search/1/movies">Search</Link></li>
                </ul>
                <ul>
                    <li><Link to="/movies">Movies</Link></li>
                </ul><ul>
                    <li><Link to="/webseries">Web Series</Link></li>
                </ul>
                <ul>
                    <li><Link to="/adult">Adult 18+</Link></li>
                </ul>    
            </div>
            <div className="container__more">
                <h2>Contact US</h2>
                <ul>
                    <li><a href="">Instagram</a></li>
                </ul>
                <ul>
                    <li><a href="">Github</a></li>
                </ul><ul>
                    <li><a href="">LinkedIn</a></li>
                </ul>
                <ul>
                    <li><a href="">Email</a></li>
                </ul>
                <ul>
                    <li><Link to="/api-docs">API Docs</Link></li>
                </ul>    
            </div>
            </div>
          </div>
          <div className="line_separete">
            <div className="by flex">
                <p style={{display:"flex"}}>Copyright <BsCCircle style={{margin:"5px 10px"}}/>2024 - {new Date().getFullYear()} All Rights are Reserved</p>
                <div className="icons">
                    <a href="" className="icon1 icon--instagram">
                        <i><AiOutlineInstagram/></i>
                    </a>
                    <a href="" className="icon1 icon--twitter">
                        <i><FaYoutube/></i>
                    </a><a href="" className="icon1 icon--linkedin">
                        <i><AiOutlineLinkedin/></i>
                    </a>
                    <a href="" className="icon1 icon--github">
                        <i><AiOutlineGithub/></i>
                    </a>
                </div>
            </div>
          </div>
        </footer>
        <div className="tab-bar">
            <Link to="/"><button className="tab-item">
            <MdHome/>
            <span>Home</span>    
            </button></Link>
            <Link to="/search/1/movies"><button className="tab-item">
            <FaSearch/>
            <span>Search</span>    
            </button></Link>
            <Link to="/movies"><button className="tab-item">
            <MdMovie/>
            <span>Movies</span>    
            </button></Link>
            <Link to="/webseries"><button className="tab-item">
            <IoIosVideocam/>
            <span>Series</span>    
            </button></Link>
            <Link to="/videos"><button className="tab-item">
            <RiSpyFill/>
            <span>Videos</span>    
            </button></Link>
            {user ?
            <div onClick={()=>{navlogout()}}><button className="tab-item">
            <BsFillPersonFill/>
            <span>User</span>    
            </button></div>:
            <div onClick={()=>{loginpophandel()}}><button className="tab-item">
            <BsFillPersonFill/>
            <span>User</span>    
            </button></div>
            }
        </div>
        {loginpop ?<Login setloginpop={loginpophandel}/>:<></>}
        </>
    )
}