export const erroresFirebase = (code) => {
	switch (code) {
		case "auth/email-already-in-use":
			return {
				code: "email",
				message: "Usuario ya registrado.",
			};
		case "auth/invalid-email":
			return {
				code: "email",
				message: "Formato email no válido.",
			};
		case "auth/invalid-login-credentials":
			return {
				code: "email",
				message: "Credenciales inválidas.",
			};
		default:
			return {
				code: "email",
				message: "Ocurrio un error en el servidor.",
			};
	}
};
