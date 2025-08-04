"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/settings': 'Settings',
  '/content': 'Content',
  '/content/posts': 'Posts',
  '/content/pages': 'Pages',
  '/content/media': 'Media',
  '/settings': 'Settings',
  '/settings/general': 'General',
  '/settings/team': 'Team',
  '/settings/billing': 'Billing',
  '/docs': 'Documentation',
  '/docs/introduction': 'Introduction',
  '/docs/get-started': 'Get Started',
  '/docs/api': 'API Reference',
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Không render gì cho đến khi đã mount
  if (!isMounted) {
    return null
  }
  
  // Tạo breadcrumb items từ pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = routeLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1
    
    return {
      path,
      label,
      isLast
    }
  })

  // Nếu không có segments hoặc chỉ có root, hiển thị dashboard
  if (breadcrumbItems.length === 0 || pathname === '/') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}