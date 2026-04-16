import { Building } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { cookies } from "next/headers";
import { defaultLocale, Locale, COOKIE_NAME } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function LoginPage() {
	const supabase = await createClient();
	const { data } = await supabase.auth.getUser();

	if (data?.user) {
		redirect("/");
	}

	const cookieStore = await cookies();
	const locale = (cookieStore.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
	const dictionary = await getDictionary(locale);

	return (
		<div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 antialiased text-nordic-dark dark:text-gray-100 relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none opacity-40">
				<div className="absolute -top-24 -right-24 w-96 h-96 bg-hint-of-green/30 rounded-full blur-3xl dark:bg-mosque/10"></div>
				<div className="absolute -bottom-24 -left-24 w-80 h-80 bg-mosque/10 rounded-full blur-3xl"></div>
			</div>

			<main className="w-full max-w-md z-10">
				<div className="text-center mb-10">
					<div className="inline-flex items-center justify-center w-14 h-14 bg-mosque rounded-xl mb-6 shadow-soft text-white">
						<Building strokeWidth={1.5} className="w-8 h-8" />
					</div>
					<h1 className="text-3xl font-bold tracking-tight text-nordic-dark dark:text-white mb-2">
						{dictionary?.login?.title}
					</h1>
					<p className="text-nordic-dark/60 dark:text-gray-400">
						{dictionary?.login?.subtitle}
					</p>
				</div>

				<div className="bg-white dark:bg-[#152e2a] rounded-2xl shadow-soft p-8 sm:p-10 border border-white/50 dark:border-mosque/20 backdrop-blur-sm">
					<SocialLoginButtons />

					{/* 
					<p className="mt-8 text-center text-sm text-nordic-dark/70 dark:text-gray-400">
						Don&apos;t have an account?{" "}
						<Link
							className="font-semibold text-mosque hover:text-mosque/80 transition-colors"
							href="#"
						>
							Sign up
						</Link>
					</p>
					*/}
				</div>

				<div className="mt-8 text-center">
					<nav className="flex justify-center gap-6 text-xs text-nordic-dark/50 dark:text-gray-500">
						<Link
							className="hover:text-nordic-dark dark:hover:text-gray-300 transition-colors"
							href="#"
						>
							Privacy Policy
						</Link>
						<Link
							className="hover:text-nordic-dark dark:hover:text-gray-300 transition-colors"
							href="#"
						>
							Terms of Service
						</Link>
						<Link
							className="hover:text-nordic-dark dark:hover:text-gray-300 transition-colors"
							href="#"
						>
							Help Center
						</Link>
					</nav>
				</div>
			</main>
		</div>
	);
}
