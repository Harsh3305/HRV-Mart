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
        "email": profile.email,
        "name": name,
        "image": picture,
        "address": [
          "House Number",
          "Line-1",
          "Line-2",
          "City",
          "PinCode",
          "Country"
        ]
      });
      
      var config = {
        method: 'post',
        url: `${process.env.BACKEND_URL}/user/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log("Loged in");
      })
      .catch(function (error) {
        console.error(error);
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