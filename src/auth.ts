import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  providers: [
    Credentials({
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.phoneNumber || !credentials.password) {
          throw new Error("Phone number and OTP are required");
        }

        try {
          const response = await axios.post(
            "https://agriguru.pythonanywhere.com/api/auth/login/",
            {
              phone_number: credentials.phoneNumber,
              password: credentials.password,
            }
          );

          const user = { ...response.data };

          // Ensure user contains necessary fields
          if (user) {
            return user; // Return the user object upon successful authentication
          } else {
            throw new Error("Invalid phone number or password");
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Merge the user data into the JWT token
      if (user) {
        return {
          ...token,
          ...user, // Add all user properties to the token
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Merge the token data into the session object
      session.user = {
        ...session.user, // Existing session user fields
        ...token, // Add all fields from the token to the session user
        id: token.sub as string, // Ensure the 'id' field is included
      } as any;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
