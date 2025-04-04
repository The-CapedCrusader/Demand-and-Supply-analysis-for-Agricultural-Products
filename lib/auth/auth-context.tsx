"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

type User = {
  id: string
  email: string
  name: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

type SignupData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    email: "farmer@example.com",
    password: "password123",
    name: "John Farmer",
    role: "farmer"
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token)
        setUser(decodedToken)
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem("auth_token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Find user
      const mockUser = MOCK_USERS.find(
        user => user.email === email && user.password === password
      )
      
      if (!mockUser) {
        throw new Error("Invalid email or password")
      }
      
      // Create a simple JWT token (for demo purposes)
      const payload = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
      }
      
      // In a real app, this token would be generated on the server
      const token = btoa(JSON.stringify(payload))
      localStorage.setItem("auth_token", token)
      
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Check if email already exists
      if (MOCK_USERS.some(user => user.email === userData.email)) {
        throw new Error("Email already in use")
      }
      
      // In a real app, we would send this data to the server to create a new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: "farmer"
      }
      
      // Create a simple JWT token (for demo purposes)
      const payload = {
        ...newUser,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
      }
      
      // In a real app, this token would be generated on the server
      const token = btoa(JSON.stringify(payload))
      localStorage.setItem("auth_token", token)
      
      setUser(newUser)
      
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 