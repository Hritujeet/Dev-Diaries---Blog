import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github"
import Twitter from "next-auth/providers/twitter"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Github, Twitter],
    callbacks: {
        async signIn({ user, account }) {
            try {
                const response = await fetch(`${BACKEND_URL}/api/user/create-user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        emailVerified: new Date().toISOString(),
                    }),
                });
                
                if (!response.ok) {
                    console.error("Backend responded with error:", response.status);
                    const errorText = await response.text();
                    console.error("Backend error details:", errorText);
                }
                
                return true;
                
            } catch (error) {
                console.error("Network error syncing user with backend:", error);
                return true;
            }
        },
        
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email as string;
                token.name = user.name as string;
                token.image = user.image as string;
            }
            return token;
        },
        
        async session({ session, token }) {
            if (token && session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
});