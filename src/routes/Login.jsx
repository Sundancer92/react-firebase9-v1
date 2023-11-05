import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {
	const { loginUser } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { required, patternEmail, minLength, validateTrim } = formValidate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "perro@malo.com",
			password: "123123",
		},
	});

	const onSubmit = async ({ email, password }) => {
		try {
			setLoading(true);
			await loginUser(email, password);
			navigate("/");
		} catch (error) {
			console.log(error.code);
			const { code, message } = erroresFirebase(error.code);
			setError(code, {
				message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Title text="Login" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type="email"
					placeholder="Ingrese un email"
					{...register("email", {
						required,
						pattern: patternEmail,
					})}
					label="Ingresa tu correo"
				>
					<FormError error={errors.email} />
				</FormInput>
				<FormInput
					type="password"
					placeholder="Una contraseña"
					{...register("password", {
						minLength,
						validate: validateTrim,
					})}
					label="Ingresa tu contraseña"
				>
					<FormError error={errors.password} />
				</FormInput>

				<Button
					text="Login"
					type="submit"
					loading={loading}
				/>
			</form>
		</>
	);
};

export default Login;
