"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Bell, AlertTriangle, Info, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface Alert {
  id: string
  title: string
  message: string
  type: "emergency" | "warning" | "info" | "success"
  category: string
  timestamp: string
  read: boolean
  priority: "high" | "medium" | "low"
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch alerts from Laravel backend
    const fetchAlerts = async () => {
      try {
        const response = await fetch("/api/alerts/user")
        const data = await response.json()
        setAlerts(data.alerts || [])
      } catch (error) {
        console.error("[v0] Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  const markAsRead = async (alertId: string) => {
    try {
      await fetch(`/api/alerts/${alertId}/read`, {
        method: "POST",
      })

      setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
    } catch (error) {
      console.error("[v0] Error marking alert as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await fetch("/api/alerts/mark-all-read", {
        method: "POST",
      })

      setAlerts(alerts.map((alert) => ({ ...alert, read: true })))
    } catch (error) {
      console.error("[v0] Error marking all alerts as read:", error)
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="w-6 h-6 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />
      default:
        return <Info className="w-6 h-6 text-blue-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const filteredAlerts =
    filter === "all" ? alerts : filter === "unread" ? alerts.filter((a) => !a.read) : alerts.filter((a) => a.read)

  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Link href="/">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-semibold text-orange-100 hover:text-white transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
        <p className="text-orange-100 text-sm">
          {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "All caught up!"}
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          {[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
            { value: "read", label: "Read" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                filter === tab.value ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 overflow-y-auto pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600 text-center max-w-sm">
              {filter === "unread"
                ? "You're all caught up! No unread notifications."
                : "You'll receive notifications about city alerts and updates here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <button
                key={alert.id}
                onClick={() => !alert.read && markAsRead(alert.id)}
                className={`w-full text-left border rounded-xl p-4 transition-all ${
                  alert.read ? "bg-white border-gray-200" : `${getAlertColor(alert.type)} border-2`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-semibold text-gray-900 ${!alert.read ? "font-bold" : ""}`}>{alert.title}</h3>
                      {!alert.read && <span className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-2" />}
                    </div>

                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{alert.message}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">{alert.category}</span>
                      {alert.priority === "high" && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">HIGH PRIORITY</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
