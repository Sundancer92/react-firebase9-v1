import { Outlet, useParams } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import Title from "../Title";

const LayoutRedirect = () => {
	const [loading, setLoading] = useState(true);
	const { nanoid } = useParams();
	const { searchData } = useFirestore();

	useEffect(() => {
		searchData(nanoid).then((docSnap) => {
			if (docSnap.exists()) {
				window.location.href = docSnap.data().origin;
			} else {
				setLoading(false);
			}
		});
	}, []);

	if (loading) return <Title text="Cargando redireccionamiento..." />;

	return (
		<div className="container mx-auto">
			<Outlet />
		</div>
	);
};

export default LayoutRedirect;
