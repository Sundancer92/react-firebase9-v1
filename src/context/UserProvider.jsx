import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(false);

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, (user) => {
			// console.log(user);
			if (user) {
				const { email, photoUrl, displayName, uid } = user;
				setUser({ email, photoUrl, displayName, uid });
			} else {
				setUser(null);
			}
		});

		return () => unsuscribe();
	}, []);

	const registerUser = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const loginUser = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const signOutUser = () => signOut(auth);

	return (
		<UserContext.Provider
			value={{ user, setUser, registerUser, loginUser, signOutUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
