import clientPromise from "@/lib/MongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
const authoptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        jwt({ token, account, user }) {
          if (account) {
            token.accessToken = account.access_token
            token.id = user?.id
          }
          return token
        },
        session({ session, token }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;
      
            return session;
          },
      },
      session: {
        strategy: 'jwt',
      },
    adapter: MongoDBAdapter(clientPromise),
}



const handler = NextAuth(authoptions)

export { handler as GET, handler as POST }