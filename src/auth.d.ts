declare module "next-auth" {
  interface User {
    name?: string;
    email: string;
    image?: string | null;
    sub: string;
    role: string;
    token: string;
    user_id: number;
    username: string;
    first_name: string;  // Ensure first_name is defined here
    last_name: string;   // Ensure last_name is defined here
    farmer_id: number;
    phone_number: string;
    address?: string;
    bio?: string;
    profile_picture?: string | null; // Ensure profile_picture is defined here
    id: string;
    iat: number;
    exp: number;
    jti: string;
  }

  interface Session {
    user: User; // Extend the Session interface with the updated User interface
    expires: string;
  }
}
