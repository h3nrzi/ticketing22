interface Error {
	field?: string;
	message: string;
}

export default interface ErrorResponse {
	errors: Error[];
}
