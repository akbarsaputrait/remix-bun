// @NOTE: Required to use CJS
// Reference: https://github.com/i18next/i18next-fs-backend/issues/59
import Backend from "i18next-fs-backend/cjs";
import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "./i18n";
import { createCookie } from "@remix-run/node";

export const cookieLocaleName = "remix-locale";

export const i18nCookie = createCookie(cookieLocaleName, {
	path: "/",
	sameSite: "lax",
	httpOnly: true,
	maxAge: 60, // 1 minute - We do not require a long session for i18n.
	secrets: [process.env.SESSION_SECRET || "s3cret"],
	secure: process.env.NODE_ENV === "production",
});

const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
		cookie: i18nCookie,
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18n,
		backend: {
			loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
		},
	},
	// The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
	// E.g. The Backend plugin for loading translations from the file system
	// Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
	plugins: [Backend],
	backend: Backend,
});

export default i18next;
