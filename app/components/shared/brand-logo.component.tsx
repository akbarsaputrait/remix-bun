import { Tooltip, TooltipContent, TooltipTrigger } from "~ui/tooltip";

type Brand = "remix" | "shadcn" | "vite" | "bun" | "i18n";

interface BrandLogoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	brand: Brand;
	url: string;
}

export default function BrandLogo({ brand, url, ...props }: BrandLogoProps) {
	return (
		<Tooltip>
			<TooltipTrigger {...props}>
				<a
					href={url}
					target="_blank"
					className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-50"
					rel="noreferrer"
				>
					<img
						src={`/${brand}.svg`}
						className="size-8 fill-red-50"
						alt="Remix Logo"
					/>
				</a>
			</TooltipTrigger>
			<TooltipContent className="capitalize">{brand}</TooltipContent>
		</Tooltip>
	);
}
