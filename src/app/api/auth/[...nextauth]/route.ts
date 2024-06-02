import { authConfig } from "@/lib/auth";
import NextAuth from "next-auth";



const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }

function GitHubProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}
