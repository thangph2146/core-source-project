import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { Button } from "./button"

export interface ToastProps {
  id?: string
  title?: string
  description?: string
  type?: "success" | "error" | "info" | "warning"
  duration?: number
  onClose?: () => void
}

const toastVariants = {
  success: {
    icon: CheckCircle2,
    className: "border-green-200 bg-green-50 text-green-800"
  },
  error: {
    icon: AlertCircle,
    className: "border-red-200 bg-red-50 text-red-800"
  },
  warning: {
    icon: AlertCircle,
    className: "border-orange-200 bg-orange-50 text-orange-800"
  },
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-800"
  }
}

export function Toast({ 
  title, 
  description, 
  type = "info", 
  onClose 
}: ToastProps) {
  const variant = toastVariants[type]
  const Icon = variant.icon

  return (
    <div className={cn(
      "relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg",
      variant.className
    )}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        {title && (
          <div className="font-medium text-sm">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90">
            {description}
          </div>
        )}
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-black/10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      )}
    </div>
  )
}