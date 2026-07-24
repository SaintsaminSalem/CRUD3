import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: "",
    });



    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const data = await login(form);


            console.log("LOGIN RESPONSE:", data);



            if(data.token){


                console.log(
                    "ROLE RECEIVED:",
                    data.user.role
                );


                alert(
                    `Role: ${data.user.role}`
                );



                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );



                if(data.user.role === "admin"){


                    navigate("/admin");


                }else{


                    navigate("/dashboard");


                }


            }else{


                alert(data.message);


            }



        } catch(error) {


            console.log(error);

            alert("Login failed");


        }


    };



    return (

        <div className="auth-container">


            <h2>
                Login
            </h2>


            <form onSubmit={handleSubmit}>


                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    onChange={handleChange}

                />



                <input

                    name="password"

                    type="password"

                    placeholder="Password"

                    onChange={handleChange}

                />



                <button type="submit">

                    Login

                </button>


            </form>



            <p>

                Don't have an account?{" "}

                <Link to="/signup">

                    Signup

                </Link>

            </p>


        </div>

    );

}
