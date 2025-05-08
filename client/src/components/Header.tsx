"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
	currentUser: { email: string } | null;
}

export default function Header({ currentUser }: HeaderProps) {
	const router = useRouter();

	const handleSignOut = () => {
		// cookieManager.delete("session");
		router.refresh();
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link href="/" className="navbar-brand">
					Ticketing
				</Link>
				<div className="navbar-nav ms-auto">
					{currentUser ? (
						<>
							<span className="nav-item nav-link">{currentUser.email}</span>
							<button
								onClick={handleSignOut}
								className="nav-item nav-link btn btn-link"
							>
								Sign Out
							</button>
						</>
					) : (
						<>
							<Link href="/auth/signin" className="nav-item nav-link">
								Sign In
							</Link>
							<Link href="/auth/signup" className="nav-item nav-link">
								Sign Up
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
