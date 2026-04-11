"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  FolderKanban,
  CreditCard,
  Settings,
  TrendingUp,
  Users,
  AlertCircle,
  Clock,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Types
type NotificationType = "project" | "message" | "payment" | "system";
type FilterType = "all" | "unread" | "projects" | "messages" | "payments";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
  avatarFallback: string;
  relatedId?: string;
  relatedUrl?: string;
}

// Helper: relative time formatter
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
}

// Notification type config
const typeConfig: Record<NotificationType, { icon: typeof FolderKanban; bg: string; color: string; badgeColor: string; label: string }> = {
  project: {
    icon: FolderKanban,
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    color: "text-cyan-600 dark:text-cyan-400",
    badgeColor: "bg-cyan-100 text-cyan-700 border-cyan-200",
    label: "Project",
  },
  message: {
    icon: MessageSquare,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    color: "text-amber-600 dark:text-amber-400",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Message",
  },
  payment: {
    icon: CreditCard,
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    color: "text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Payment",
  },
  system: {
    icon: Settings,
    bg: "bg-slate-100 dark:bg-slate-800/50",
    color: "text-slate-600 dark:text-slate-400",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    label: "System",
  },
};

// Notification Icon Component
  const now = new Date();
  return [
    {
      id: "n1",
      type: "project",
      title: "New project invitation",
      description: "You have been invited to join 'E-commerce Platform Redesign' as a lead developer.",
      timestamp: new Date(now.getTime() - 5 * 60 * 1000),
      read: false,
      avatarFallback: "JD",
      relatedId: "proj-001",
      relatedUrl: "/projects/proj-001",
    },
    {
      id: "n2",
      type: "message",
      title: "New message from Sarah Chen",
      description: "Hey! I reviewed the latest deliverables. Everything looks great, just a few minor adjustments needed on the dashboard layout.",
      timestamp: new Date(now.getTime() - 25 * 60 * 1000),
      read: false,
      avatarFallback: "SC",
      relatedId: "msg-142",
      relatedUrl: "/messages/msg-142",
    },
    {
      id: "n3",
      type: "payment",
      title: "Payment released",
      description: "$2,450.00 has been released from escrow for milestone 3 of 'Mobile App Development'.",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      read: false,
      avatarFallback: "$$",
      relatedId: "pay-789",
      relatedUrl: "/earnings",
    },
    {
      id: "n4",
      type: "system",
      title: "Profile verification approved",
      description: "Congratulations! Your profile has been verified. You now have the verified badge on your profile.",
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "EL",
      relatedUrl: "/profile",
    },
    {
      id: "n5",
      type: "project",
      title: "Milestone completed",
      description: "'UI/UX Design Phase' milestone has been marked complete by the client. Awaiting your review.",
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "MK",
      relatedId: "proj-003",
      relatedUrl: "/projects/proj-003",
    },
    {
      id: "n6",
      type: "message",
      title: "New message from Alex Rivera",
      description: "Can we schedule a call this week to discuss the API integration timeline?",
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000),
      read: false,
      avatarFallback: "AR",
      relatedId: "msg-138",
      relatedUrl: "/messages/msg-138",
    },
    {
      id: "n7",
      type: "payment",
      title: "Escrow funded",
      description: "Client has funded the escrow for 'Backend API Development' - $5,800.00 secured.",
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "$$",
      relatedId: "pay-790",
      relatedUrl: "/projects/proj-005",
    },
    {
      id: "n8",
      type: "system",
      title: "Platform update: New features",
      description: "We've added enhanced milestone tracking and automated reporting. Check out what's new.",
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "EL",
      relatedUrl: "/updates",
    },
    {
      id: "n9",
      type: "project",
      title: "Project completed successfully",
      description: "'Brand Identity Package' has been marked as complete. The client left a 5-star review!",
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "LP",
      relatedId: "proj-002",
      relatedUrl: "/projects/proj-002",
    },
    {
      id: "n10",
      type: "payment",
      title: "Withdrawal processed",
      description: "Your withdrawal of $3,200.00 has been processed. Funds should arrive in 2-3 business days.",
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      avatarFallback: "$$",
      relatedId: "pay-785",
      relatedUrl: "/earnings",
};

// Notification Icon Component
function NotificationIcon({ type, size = "default" }: { type: NotificationType; size?: "sm" | "default" }) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "size-4" : "size-5";

  return (
    <div className={cn("flex items-center justify-center rounded-full", config.bg, size === "sm" ? "size-9" : "size-11")}>
      <Icon className={cn(sizeClasses, config.color)} />
    </div>
  );
}

// Single Notification Item Component
function NotificationItem({
  notification,
  onToggleRead,
  onDelete,
}: {
  notification: Notification;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const config = typeConfig[notification.type];

  return (
    <div
      className={cn(
        "group relative flex gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md",
        notification.read
          ? "bg-white border-slate-200 hover:border-slate-300"
          : "bg-white border-cyan-200 shadow-sm hover:border-cyan-300"
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute top-4 right-4 size-2.5 rounded-full bg-cyan-500 animate-pulse" />
      )}

      {/* Avatar / Icon */}
      <div className="shrink-0">
        <Avatar className="size-11 border border-slate-200">
          <AvatarFallback className={cn("text-sm font-semibold", config.bg, config.color)}>
            {notification.avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-xs font-medium", config.badgeColor)}>
            {config.label}
          </Badge>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="size-3" />
            {formatRelativeTime(notification.timestamp)}
          </span>
        </div>

        <h4 className={cn("text-sm font-semibold leading-tight", !notification.read ? "text-slate-900" : "text-slate-700")}>
          {notification.title}
        </h4>

        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {notification.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {notification.relatedUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
              onClick={() => {
                // In a real app, use router.push(notification.relatedUrl)
                console.log("Navigate to:", notification.relatedUrl);
              }}
            >
              <ExternalLink className="size-3" />
              View Details
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 gap-1 px-2 text-xs", notification.read ? "text-slate-500 hover:text-slate-700" : "text-amber-600 hover:text-amber-700")}
            onClick={() => onToggleRead(notification.id)}
          >
            {notification.read ? (
              <>
                <AlertCircle className="size-3" />
                Mark Unread
              </>
            ) : (
              <>
                <Check className="size-3" />
                Mark Read
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(notification.id)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ icon: Icon, label, value, color }: { icon: typeof Bell; label: string; value: number | string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className={cn("flex items-center justify-center rounded-lg size-10", color)}>
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// Main Page Component
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem('userId') || '';
      if (!userId) {
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/notifications?userId=${userId}`);
      const data = await response.json();
      
      if (data.success && data.notifications) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  // Computed values
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const projectCount = useMemo(() => notifications.filter((n) => n.type === "project").length, [notifications]);
  const messageCount = useMemo(() => notifications.filter((n) => n.type === "message").length, [notifications]);
  const paymentCount = useMemo(() => notifications.filter((n) => n.type === "payment").length, [notifications]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "projects":
        return notifications.filter((n) => n.type === "project");
      case "messages":
        return notifications.filter((n) => n.type === "message");
      case "payments":
        return notifications.filter((n) => n.type === "payment");
      default:
        return notifications;
    }
  }, [notifications, activeFilter]);

  // Handlers
  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markFilterRead = () => {
    const idsToMark = new Set(filteredNotifications.map((n) => n.id));
    setNotifications((prev) =>
      prev.map((n) => (idsToMark.has(n.id) ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "projects", label: "Projects" },
    { key: "messages", label: "Messages" },
    { key: "payments", label: "Payments" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
            <p className="mt-1 text-slate-600">Stay updated with your latest activity</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead}>
                <CheckCheck className="mr-2 size-4" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={Bell}
            label="Total Notifications"
            value={notifications.length}
            color="bg-slate-100 text-slate-600"
          />
          <StatsCard
            icon={AlertCircle}
            label="Unread"
            value={unreadCount}
            color="bg-cyan-100 text-cyan-600"
          />
          <StatsCard
            icon={FolderKanban}
            label="Projects"
            value={projectCount}
            color="bg-cyan-100 text-cyan-600"
          />
          <StatsCard
            icon={MessageSquare}
            label="Messages"
            value={messageCount}
            color="bg-amber-100 text-amber-600"
          />
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-2">
          {filters.map((filter) => {
            const count =
              filter.key === "all"
                ? notifications.length
                : filter.key === "unread"
                ? unreadCount
                : filter.key === "projects"
                ? projectCount
                : filter.key === "messages"
                ? messageCount
                : paymentCount;

            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeFilter === filter.key
                    ? "bg-cyan-50 text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {filter.label}
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-1",
                    activeFilter === filter.key
                      ? "bg-cyan-100 text-cyan-700"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {count}
                </Badge>
              </button>
            );
          })}
          <div className="ml-auto flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markFilterRead}>
                Mark filter read
              </Button>
            )}
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
              <Bell className="mb-4 size-12 text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-900">No notifications</h3>
              <p className="mt-1 text-slate-500">
                {activeFilter === "unread"
                  ? "All caught up! No unread notifications."
                  : "No notifications in this category yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onToggleRead={toggleRead}
                onDelete={deleteNotification}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
