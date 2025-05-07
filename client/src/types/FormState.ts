import { ErrorResponse } from "./ErrorResponse";

export interface FormState {
	errors?: ErrorResponse["errors"];
	success?: boolean;
}
