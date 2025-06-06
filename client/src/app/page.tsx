import { getCurrentUser } from "@/lib/api/users-api";
import HomeContent from "@/components/home/HomeContent";

export default async function Home() {
	const { data, errors } = await getCurrentUser();

	return (
		<>
			<HomeContent currentUser={data?.currentUser || null} errors={errors} />
		</>
	);
}
