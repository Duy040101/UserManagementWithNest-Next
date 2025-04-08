import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvalidEmailPasswordError } from "./utils/errors"
import { sendRequest } from "./utils/api"
import Password from "antd/es/input/Password"
import { IUser } from "./types/next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            //const r=await onFinish();
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const user = await sendRequest<IBackendRes<Ilogin>>({
                    method: "POST",
                    url: "http://localhost:8080/api/v1/auth/login",
                    body: {
                        username: credentials.email,
                        password: credentials.password,
                    },
                })

                console.log(">>>check user:", user);
                return {
                    _id: user.data?.user._id,
                    name: user.data?.user.name,
                    email: user.data?.user.email,
                    access_token: user.data?.access_token,
                }
            },
        }),],
    //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = (user as IUser)
            }
            return token
        },
        session({ session, token }) {
            (session.user as IUser) = token.user;
            return session
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
})


