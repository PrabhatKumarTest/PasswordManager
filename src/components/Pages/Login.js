import Navbar from "../Navbar";


const Login = () => {

    return (
        <>
        <Navbar></Navbar>
            <div>
                <div className="Login mt-5 d-flex flex-column flex-md-row align-items-center justify-content-center container mt-4 gap-4" style={{height: "70vh"}}>
                    {/* Logo */}
                    <div className="logo d-flex align-items-center col-md-6">
                        <h1>CipherVault</h1>
                    </div>
                    {/* Login Form */}
                    <div className="form col-md-4 p-4 shadow mb-5 bg-body-tertiary rounded">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Login;