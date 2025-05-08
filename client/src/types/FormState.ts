interface Error {
	field?: string;
	message: string;
}

export interface FormState {
	errors: Error[];
	success: boolean;
}
