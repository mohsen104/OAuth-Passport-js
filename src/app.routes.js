import { Router } from "express";
import passport from "passport";

const router = Router();

function redirectIfLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
    }
    next();
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

router.get("/", redirectIfLoggedIn, (req, res) => {
    res.send(`
        <h1>Welcome</h1>
        <p><a href="/auth/github">Login with GitHub</a></p>
        <p><a href="/auth/google">Login with Google</a></p>
    `);
});

router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile");
    }
);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile");
    }
);

router.get("/profile", ensureAuthenticated, (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.send(`
        <h1>Hello ${req.user.displayName} 👋</h1>
        <p><a href="/logout">Logout</a></p>
        `);
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

router.use((req, res) => {
    res.status(404).json({
        message: "Not Found Route !",
        method: req.method,
        url: req.originalUrl
    });
});

router.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    const message = err?.cause?.sqlMessage ?? err?.message ?? err?.stack ?? "Internal Server Error .";
    res.status(status).json({ message });
});

export default router;