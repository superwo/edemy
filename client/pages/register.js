import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("Radu");
  const [email, setEmail] = useState("avadanii@tiscali.it");
  const [password, setPassword] = useState("artemida");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password,
    });
    console.log("REGISTER RESPONSE", data);
  };

  return (
    <>
      <h1 className="p-5 mb-4 jumbotron text-center square">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

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

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
