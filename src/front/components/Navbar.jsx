import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()
	//el store tiene acceso a todas las variables de initialStore y el dispatch a todas las acciones de storeReducer
	const navigate = useNavigate()

	const handleDeleteToken = () => {
		localStorage.removeItem("token")
		dispatch({ type: "save_token", payload: "" })
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{
						store.token ? (<button className="btn btn-primary" onClick={handleDeleteToken}>Logout</button>)
							:
							(<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>)
					}


				</div>
			</div>
		</nav>
	);
};