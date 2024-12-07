import { useLocation, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "~modules/i18n/i18n";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~ui/select";

export function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();

	const pathname = useMemo(() => {
		return location.pathname.replace(/\/$/, "");
	}, [location]);

	return (
		<Select
			defaultValue={i18n.resolvedLanguage}
			onValueChange={(value) => navigate(`${pathname}?lng=${value}`)}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Select Language" />
			</SelectTrigger>
			<SelectContent>
				{LANGUAGES.map((language) => (
					<SelectItem key={language.code} value={language.code}>
						{language.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default LanguageSwitcher;
