import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Simple in-memory user store (replace with database in production)
const users: Array<{ id: string; email: string; password: string; name: string }> = []

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user exists
        const user = users.find((u) => u.email === credentials.email)
        
        if (!user) {
          // Auto-register for demo (in production, use separate register endpoint)
          const bcrypt = await import('bcryptjs')
          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          const newUser = {
            id: Date.now().toString(),
            email: credentials.email,
            password: hashedPassword,
            name: credentials.email.split('@')[0],
          }
          users.push(newUser)
          return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          }
        }

        // Verify password
        const bcrypt = await import('bcryptjs')
        const isValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}
