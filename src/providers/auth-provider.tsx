"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Base API URL - you can change this to your production URL when deploying
const API_BASE_URL = "http://localhost:5000/api"

type User = {
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  pinNumber?: string
  image?: string
  reraNumber?: string
  document?: string[]
  bankName?: string
  accountNumber?: string
  confirmAccountNumber?: string
  ifscCode?: string
  recipientName?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string) => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<boolean>
  register: (email: string) => Promise<void>
  verifyRegistrationOtp: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  skipAuth: () => void
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("authToken")

        if (!token) {
          setIsLoading(false)
          return
        }

        // Fetch user data from API
        const response = await fetch(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          // If the token is invalid, clear it
          localStorage.removeItem("authToken")
        }
      } catch (error) {
        console.error("Authentication error:", error)
        localStorage.removeItem("authToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string) => {
    setIsLoading(true)
    try {
      // Call the API to send OTP
      const response = await fetch(`${API_BASE_URL}/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store email temporarily for OTP verification
        sessionStorage.setItem("pendingAuthEmail", email)

        toast.info(data.message || "Please check your email for the verification code", {
          autoClose: 5000,
          closeButton: true,
          position: "top-right",
        
        })
        router.push("/verify-otp"); // ✅ Directly redirecting to OTP page
      } else {
        throw new Error(data.message || "Failed to send OTP")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to send OTP. Please try again.", {
        autoClose: 5000,
        closeButton: true,
        position: "top-right",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Call the API to verify OTP
      const response = await fetch(`${API_BASE_URL}/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save the token
        localStorage.setItem("authToken", data.token)

        // Set user data
        setUser(data.user)

        toast.success("You have successfully logged in", {
          autoClose: 5000,
          closeButton: true,
          position: "top-right",
          onClick: () => router.push("/profile"),
        })
      
        return true
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.", {
          autoClose: 5000,
          closeButton: true,
          position: "top-right",
        })
        return false
      }
    } catch (error) {
      console.error("OTP verification error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to verify OTP. Please try again.", {
        autoClose: 5000,
        closeButton: true,
        position: "top-right",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string) => {
    setIsLoading(true)
    try {
      // Call the API to register and send OTP
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store email temporarily for OTP verification
        sessionStorage.setItem("pendingRegistrationEmail", email)
        router.push("/verify-registration-otp")

        toast.info(data.message || "Please check your email for the verification code", {
          autoClose: 5000,
          closeButton: true,
          position: "top-right",
        })

      } else {
        throw new Error(data.message || "Failed to register")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to register. Please try again.", {
        autoClose: 5000,
        closeButton: true,
        position: "top-right",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyRegistrationOtp = async (email: string, otp: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/verifyregistrationotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Ensure otp is correctly formatted
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("OTP Verification Failed:", data);
        return { success: false, message: data?.message || "Invalid OTP" };
      }
    
  
      return { success: true, message: data?.message || "OTP Verified Successfully!" };
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Something went wrong. Please try again." };
    }
  };
  

  const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        throw new Error("Authentication required");
      }
  
      // Ensure `id` is defined
      if (!user?.id) {
        throw new Error("User ID is required");
      }
  
      // Prepare the data to match the expected structure
      const payload = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        pinNumber: userData.pinNumber,
        image: userData.image,
        reraNumber: userData.reraNumber,
        bankName: userData.bankName,
        accountNumber: userData.accountNumber,
        ifscCode: userData.ifscCode,
        recipientName: userData.recipientName,
        document: userData.document, // Include documents if needed
      };
  
      // Call the API to update user profile
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update user data in state
        setUser((prev) =>
          prev ? ({ ...prev, ...payload } as User) : null
        );
        
  
        toast.success("Your profile has been updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return true;
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken")

      if (token) {
        // Call the API to logout (optional - for server-side session management)
        await fetch(`${API_BASE_URL}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch((err) => console.error("Logout API error:", err))
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear local storage and state regardless of API response
      localStorage.removeItem("authToken")
      sessionStorage.removeItem("pendingAuthEmail")
      sessionStorage.removeItem("pendingRegistrationEmail")
      setUser(null)

      toast.success("You have been successfully logged out", {
        autoClose: 5000,
        closeButton: true,
        position: "top-right",
        onClick: () => router.push("/login"),
      })
    }
  }

  const skipAuth = () => {
    // Set a flag in localStorage to indicate the user skipped auth
    localStorage.setItem("authSkipped", "true")
    router.push("/profile")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        verifyOtp,
        register,
        verifyRegistrationOtp,
        logout,
        skipAuth,
        updateUserProfile,
      }}
    >
      <ToastContainer />
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

