import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        role: "user",
    });
    const { name, email, password, password2, role } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => {
            return state.auth;
        }
    );
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            navigate("/");
        }
        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);
    const onChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name,
                email,
                password,
                role,
            };
            dispatch(register(userData));
        }
    };
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-grouptextarea"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-grouptextarea"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-grouptextarea"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-grouptextarea"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            placeholder="Confirm your Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-grouptextarea"
                            id="role"
                            name="role"
                            value={role}
                            onChange={onChange}
                            placeholder="Enter your Role"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
