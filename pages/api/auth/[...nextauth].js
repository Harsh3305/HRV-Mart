import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth';
var axios = require('axios');

export default NextAuth({
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
      const name = profile.name;
      const picture = profile.picture;
      const locale = profile.locale
      /*
       * Use name, picture and locale when integrating data  
       */
      var data = JSON.stringify({
        "username": "mor_2314",
        "password": "83r5^_"
      });

      var config = {
        method: 'post',
        url: `${process.env.BACKEND_URL}/auth/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };
      var d ;
      await axios(config)
        .then(function (response) {
          d = JSON.stringify(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      return true;
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