import { cookies } from "next/headers";

interface CookieOptions {
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: "strict" | "lax" | "none";
	path?: string;
	maxAge?: number;
	expires?: Date;
}

export class CookieManager {
	private static instance: CookieManager;
	private readonly defaultOptions: CookieOptions = {
		httpOnly: true,
		secure: false,
		// sameSite: "none",
		// path: "/",
	};

	private constructor() {}

	public static getInstance(): CookieManager {
		if (!CookieManager.instance) {
			CookieManager.instance = new CookieManager();
		}
		return CookieManager.instance;
	}

	public set(name: string, value: string, options: CookieOptions = {}): void {
		cookies().set(name, value, {
			...this.defaultOptions,
			...options,
		});
	}

	public get(name: string) {
		return cookies().get(name);
	}

	public delete(name: string): void {
		cookies().delete(name);
	}

	public has(name: string): boolean {
		return !!this.get(name);
	}

	public getAll() {
		return cookies().getAll();
	}
}

// Export a singleton instance for convenience
export const cookieManager = CookieManager.getInstance();
