import ErrorResponse from "@/types/ErrorResponse";

interface ErrorDisplayProps {
	field?: string;
	errors: ErrorResponse["errors"];
}

export default function ErrorDisplay({ errors, field }: ErrorDisplayProps) {
	const fieldErrors = errors.filter((error) => error.field === field);

	if (fieldErrors)
		return (
			<>
				{fieldErrors.map((error) => (
					<div key={error.message} className="alert alert-danger">
						{error.message}
					</div>
				))}
			</>
		);
	else
		return (
			<>
				{errors.map((error) => (
					<div key={error.message} className="alert alert-danger">
						{error.message}
					</div>
				))}
			</>
		);
}
