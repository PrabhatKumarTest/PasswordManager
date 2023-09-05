import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // all State
  const [state, setState] = useState([{ username: "", website: "", password: "" }])
  const [value, setValue] = useState({ username: "", website: "", password: "" })


  // Functions 
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  // Get all Saved Password 
  let Data = localStorage.getItem("password")
  const getPassword = () => {
    setState(JSON.parse(Data))
  }

  //  Adding Passwords
  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = state.concat(value)
    setState(newData)
    localStorage.setItem("password", JSON.stringify(newData))
    setValue({ username: "", website: "", password: "" })
  }

  // Delete a Password 
  const deletePassword = async (website) => {
    let dataAterDelete = state.filter((elem) => {
      return elem.website !== website
    })
    await setState(dataAterDelete)
    localStorage.setItem("password", JSON.stringify(dataAterDelete))
  }

  // useState Function to render on load
  useEffect(() => {
    getPassword()
  }, [])

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            CipherVault
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Navbar Ends */}

      {/* Main Body for application */}
      <div className="container">
        {/* Table start */}
        <div className=" table-responsive">
          <table className="table table-bordered table-hover my-3">
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Website</th>
                <th scope="col">Username or Email</th>
                <th scope="col">Password</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.map(((elem, index) => {
                return <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{elem.website}</td>
                  <td>{elem.username}</td>
                  <td>{elem.password}</td>
                  <td>{ <button className="btn btn-sm btn-dark" onClick={() => deletePassword(elem.website)}> Delete</button> }</td>
                </tr>
              }))}

            </tbody>
          </table>
        </div>
      </div>
      {/* Table Ends */}

      {/* Add Password Form Start*/}

      <div className="container d-md-flex justify-content-center ">
        <div className="card  col-md-6">
          <div className="card-body ">
            <h5 className="card-title">Add a Password to Remember </h5>
            <form onSubmit={handleSubmit}>
              {/* Input for website */}
              <div className="mb-3">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name='website'
                  aria-describedby="emailHelp"
                  value={value.website}
                  onChange={onChange}
                />
              </div>
              {/* Input for username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name='username'
                  aria-describedby="emailHelp"
                  value={value.username}
                  onChange={onChange}

                />
              </div>
              {/* Input for password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name='password'
                  value={value.password}
                  onChange={onChange}
                />
              </div>
              {/* Caption Text */}
              <div id="emailHelp" className="form-text">
                We'll never share your email and password with anyone else.
              </div>
              {/* Save Btn */}
              <button type="submit" className="btn btn-dark mt-3">
                Save Password
              </button>
            </form>
          </div>
        </div>

      </div>
      {/* Add Password Form Ends*/}

      {/* Main Body for application Ends*/}

      {/* Footer starts*/}
      <div className="footer container">

      </div>
      {/* Footer Ends*/}

    </div>
  );
}

export default App;
