import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
	// clear the jwt from the session
	req.session = null;

	return res.status(204).json({});
});

export { router as signoutRouter };
