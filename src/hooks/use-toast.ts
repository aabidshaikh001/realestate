"use client"

import { toast } from "sonner"

// Toast function to display notifications
export const showToast = (
  title: React.ReactNode,
  description?: React.ReactNode,
  options?: {
    action?: {
      label: string
      onClick: () => void
    }
    duration?: number
    type?: "success" | "error" | "info" | "warning"
  }
) => {
  const { action, duration = 5000, type = "info" } = options || {}

  switch (type) {
    case "success":
      toast.success(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    case "error":
      toast.error(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    case "warning":
      toast.warning(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    default:
      toast(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
  }
}

// Hook to use toast (optional, for consistency with your existing code)
export const useToast = () => {
  return {
    toast: showToast,
    dismiss: toast.dismiss, // sonner provides a dismiss function
  }
}