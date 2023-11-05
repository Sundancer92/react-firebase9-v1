import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
	const [copy, setCopy] = useState({});
	const { required, patternURL } = formValidate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		setValue,
		setError,
	} = useForm();

	const { data, loading, error, getData, addData, deleteData, updateData } =
		useFirestore();
	const [newOriginID, setNewOriginID] = useState();

	useEffect(() => {
		getData();
	}, []);

	if (loading.getData) return <p>Loading data...</p>;
	if (error) return <p>{error}</p>;

	const onSubmit = async ({ url }) => {
		try {
			if (newOriginID) {
				await updateData(newOriginID, url);
				setNewOriginID("");
			} else {
				await addData(url);
			}
			resetField("url");
		} catch (error) {
			const { code, message } = erroresFirebase(error.code);
			setError(code, { message });
		}
	};

	const handleDeleteDoc = async (docId) => {
		await deleteData(docId);
	};

	const handleClickEdit = (item) => {
		setValue("url", item.origin);
		setNewOriginID(item.nanoid);
	};

	const pathURL = window.location.href;

	const handleClickCopy = async (nanoid) => {
		await navigator.clipboard.writeText(pathURL + nanoid);
		setCopy({ [nanoid]: true });
	};

	return (
		<div>
			<Title text="Home" />

			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type="text"
					placeholder="https://google.com"
					{...register("url", {
						required,
						pattern: patternURL,
					})}
					label="Ingresa un URL"
				>
					<FormError error={errors.url} />
				</FormInput>
				{newOriginID ? (
					<Button
						type="submit"
						text="EDIT URL"
						color="yellow"
						loading={loading.updateData}
					/>
				) : (
					<Button
						type="submit"
						text="ADD URL"
						color="blue"
						loading={loading.addData}
					/>
				)}
			</form>

			{data.map((item) => (
				<div
					key={item.nanoid}
					className="p-6 mb-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
				>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{pathURL}
						{item.nanoid}
					</h5>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{item.origin}
					</p>
					<div className="flex space-x-2">
						<Button
							type="button"
							text="Delete"
							color="red"
							loading={loading[item.nanoid]}
							onClick={() => handleDeleteDoc(item.nanoid)}
						/>
						<Button
							type="button"
							text="Edit"
							color="yellow"
							// loading={loading.updateData}
							onClick={() => handleClickEdit(item)}
						/>
						<Button
							type="button"
							text={copy[item.nanoid] ? "Copied" : "Copy"}
							color="blue"
							// loading={loading.updateData}
							onClick={() => handleClickCopy(item.nanoid)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;
