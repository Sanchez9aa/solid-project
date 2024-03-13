import { CommentsSection } from "~/features/CommentsSection";
import { CommentsProvider } from "~/context";
import "./index.css";

export default function Home() {
	return (
		<main class="m-auto max-w-[1080px] pt-12 relative">
			<CommentsProvider>
				<CommentsSection />
			</CommentsProvider>
		</main>
	);
}
