import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Perfil from "./routes/Perfil";
import Navbar from "./components/Navbar";
import Register from "./routes/Register";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import NotFound from "./routes/NotFound";
import LayoutRedirect from "./components/layouts/LayoutRedirect";

const App = () => {
	const { user } = useContext(UserContext);

	if (user === false) return <p>Cargando....</p>;

	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<LayoutContainerForm />}
				>
					<Route
						path="/login"
						element={<Login />}
					></Route>
					<Route
						path="/register"
						element={<Register />}
					></Route>
				</Route>

				<Route
					path="/"
					element={<LayoutRequireAuth />}
				>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="/perfil"
						element={<Perfil />}
					/>
				</Route>

				<Route
					path="/:nanoid"
					element={<LayoutRedirect />}
				>
					<Route
						index
						element={<NotFound />}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;
