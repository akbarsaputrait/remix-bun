import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { ThemeProvider } from "~components/shared/theme-provider.component";
import i18next, { i18nCookie } from "~modules/i18n/i18next.server";
import { TooltipProvider } from "~ui/tooltip";
import { combineHeaders } from "./utils/misc.server";

import FontsCss from "~/styles/fonts.scss?url";
import TailwindCss from "~/styles/tailwind.scss?url";
import { GlobalPendingIndicator } from "~components/shared/global-pending.component";
import { Toaster } from "sonner";
import sonnerStyles from "node_modules/sonner/dist/styles.css?url";

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: TailwindCss },
		{ rel: "stylesheet", href: FontsCss },
		{ rel: "stylesheet", href: sonnerStyles },
		...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const locale = await i18next.getLocale(request);

	return json(
		{ locale },
		{
			headers: combineHeaders({
				"Set-Cookie": await i18nCookie.serialize(locale),
			}),
		},
	);
}

export const handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: "common",
};

export function Layout({ children }: { children: React.ReactNode }) {
	// Get the locale from the loader
	const { locale } = useLoaderData<typeof loader>();
	const { i18n } = useTranslation();

	// This hook will change the i18n instance language to the current locale
	// detected by the loader, this way, when we do something to change the
	// language, this locale will change and i18next will load the correct
	// translation files
	useChangeLanguage(locale);

	return (
		<html lang={locale} dir={i18n.dir()} suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<GlobalPendingIndicator />
					<Toaster />
					<TooltipProvider>{children}</TooltipProvider>
					<ScrollRestoration />
					<Scripts />
				</ThemeProvider>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
