import NextAuth from "next-auth";
import Config from "../../../../config";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: Config.googleClientId,
      clientSecret: Config.googleClientSecret,
    }),
  ],
  secret:Config.nextAuthSecret,
  callbacks: {
    //jwtが作成・更新された時に呼ばれる
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    //セッションがチェックされた時に呼ばれる
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
