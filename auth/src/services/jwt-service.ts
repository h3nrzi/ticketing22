import jwt from "jsonwebtoken";

interface JwtPayload {
	id: string;
	email: string;
	iat?: number;
}

class JwtService {
	static sign(payload: JwtPayload): string {
		return jwt.sign(payload, process.env.JWT_KEY!);
	}

	static verify(token: string): JwtPayload {
		return jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;
	}
}

export default JwtService;
