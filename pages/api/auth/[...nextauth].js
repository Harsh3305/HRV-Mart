import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth';

export default NextAuth ({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      })
    ],
    debug: false,
    session: {
      maxAge: 30 * 24 * 60 * 60, // 30 days,
      updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log({profile: profile})
        const name = profile.name;
        const picture = profile.picture;
        const locale = profile.locale
        return true;
        // }
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
      async session({ session, user, token }) {
        return session
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        return token
      },
    },
    secret: process.env.SECRET
})