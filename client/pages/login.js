import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";

const Login = () => {
  const [email, setEmail] = useState("avadanii@tiscali.it");
  const [password, setPassword] = useState("artemida");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`api/login`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="p-5 mb-4 jumbotron text-center square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin="true" /> : "Submit"}
          </button>
        </form>

        <p className="text-center p-3">
          Not yet registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
