import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
	// If there is no jwt in the session, return null
	if (!req.session?.jwt) return res.json({ currentUser: null });

	// If the jwt is valid, return the user. If not, return null
	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
		return res.json({ currentUser: payload });
	} catch (error) {
		return res.json({ currentUser: null });
	}
});

export { router as currentUserRouter };
