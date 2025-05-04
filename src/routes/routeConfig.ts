
import { ReactNode } from "react";

// Define route configuration types
export interface RouteConfig {
  path: string;
  element: ReactNode;
  requireAuth: boolean;
  children?: RouteConfig[];
}

// Define common route paths for frontend
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CALENDAR: "/calendar",
  SLOT_BROADCAST: "/slot-broadcast",
  SERVICES: "/services",
  SERVICE_CREATION: "/service-creation",
  EVENT_MANAGEMENT: "/event-management",
  BOOKINGS: "/bookings",
  SETTINGS: "/settings",
  UPGRADE: "/upgrade",
  VOICE_ASSISTANT: "/voice-assistant",
  CONVERSATIONS: "/conversations",
  PROFILE: "/profile",
  HELP: "/help",
  HISTORY: "/history"
};

// Define API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/login",
    REGISTER: "/users/register",
    PROFILE: "/users/profile",
  },
  SERVICES: {
    BASE: "/services",
    PUBLIC: "/services/public",
  },
  SLOTS: {
    BASE: "/slots",
    SERVICE: "/slots/service",
    DATERANGE: "/slots/daterange",
    PUBLIC: "/slots/public",
  },
  BOOKINGS: {
    BASE: "/bookings",
    PROVIDER: "/bookings/provider",
    CUSTOMER: "/bookings/customer",
  },
  CONVERSATIONS: {
    QUERY: "/conversations/query",
    HISTORY: "/conversations/history",
  },
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    ACTIVE: "/subscriptions/active",
    HISTORY: "/subscriptions/history",
    TRANSACTIONS: "/subscriptions/transactions",
  }
};
