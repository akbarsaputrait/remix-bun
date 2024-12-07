import { useNavigation } from "@remix-run/react";
import { cn } from "~components/lib/utils";

export function GlobalPendingIndicator() {
	const navigation = useNavigation();
	const pending = navigation.state !== "idle";

	return (
		<div className={cn("fixed top-0 right-0 left-0", { hidden: !pending })}>
			<div className="h-0.5 w-full overflow-hidden bg-muted">
				<div className="h-full w-full origin-left-right animate-progress bg-muted-foreground" />
			</div>
		</div>
	);
}
