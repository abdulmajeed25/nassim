import { StateCreator } from 'zustand';

export interface UIStore {
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  
  // Modal states
  modals: {
    [key: string]: boolean;
  };
  
  // Sidebar states
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Theme and appearance
  darkMode: boolean;
  rtlMode: boolean;
  
  // Notifications
  notifications: Notification[];
  
  // Page builder states
  pageBuilderMode: 'edit' | 'preview' | 'live';
  selectedBlockId: string | null;
  draggedBlockId: string | null;
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setDarkMode: (dark: boolean) => void;
  setRtlMode: (rtl: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setPageBuilderMode: (mode: 'edit' | 'preview' | 'live') => void;
  setSelectedBlockId: (id: string | null) => void;
  setDraggedBlockId: (id: string | null) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: Date;
}

export const createUISlice: StateCreator<UIStore> = (set, get) => ({
  // Initial states
  isLoading: false,
  loadingMessage: '',
  modals: {},
  sidebarOpen: true,
  sidebarCollapsed: false,
  darkMode: false,
  rtlMode: true,
  notifications: [],
  pageBuilderMode: 'edit',
  selectedBlockId: null,
  draggedBlockId: null,

  // Actions
  setLoading: (loading, message = '') => {
    set({ isLoading: loading, loadingMessage: message });
  },

  openModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    }));
  },

  closeModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    }));
  },

  toggleModal: (modalId) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] },
    }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  setSidebarCollapsed: (collapsed) => {
    set({ sidebarCollapsed: collapsed });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setDarkMode: (dark) => {
    set({ darkMode: dark });
    // Apply dark mode to document
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  setRtlMode: (rtl) => {
    set({ rtlMode: rtl });
    // Apply RTL to document
    if (typeof document !== 'undefined') {
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      document.documentElement.lang = rtl ? 'ar' : 'en';
    }
  },

  addNotification: (notificationData) => {
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    // Auto remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(notification.id);
      }, notification.duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  setPageBuilderMode: (mode) => {
    set({ pageBuilderMode: mode });
  },

  setSelectedBlockId: (id) => {
    set({ selectedBlockId: id });
  },

  setDraggedBlockId: (id) => {
    set({ draggedBlockId: id });
  },
});