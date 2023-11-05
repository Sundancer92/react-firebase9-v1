import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
	const { user, signOutUser } = useContext(UserContext);

	const handleClickLogOut = async () => {
		try {
			await signOutUser();
		} catch (error) {
			console.log(error.code);
		}
	};

	const classButtonBlue =
		"px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
	const classButtonRed =
		"px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
			<div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
				<Link
					to="/"
					className="flex items-center"
				>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						URLShort APP
					</span>
				</Link>
				<div className="flex md:order-2">
					{user ? (
						<>
							<NavLink
								to="/"
								className={classButtonBlue}
							>
								Inicio
							</NavLink>
							<button
								onClick={handleClickLogOut}
								className={classButtonRed}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<NavLink
								to="/register"
								className={classButtonBlue}
							>
								Register
							</NavLink>
							<NavLink
								to="/login"
								className={classButtonBlue}
							>
								Login
							</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
