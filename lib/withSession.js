import { withIronSession } from "next-iron-session";

const sessionOptions = {
    password: process.env.SESSION_SECRET, // Replace with your session secret
    cookieName: "myapp_cookiename",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    },
};

export function withSession(handler) {
    return withIronSession(handler, sessionOptions);
}
