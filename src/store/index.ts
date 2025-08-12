import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { PageStore, createPageSlice } from './pageStore';
import { SettingsStore, createSettingsSlice } from './settingsStore';
import { MediaStore, createMediaSlice } from './mediaStore';
import { MenuStore, createMenuSlice } from './menuStore';
import { PostStore, createPostSlice } from './postStore';
import { UIStore, createUISlice } from './uiStore';

// Combined store interface
type AppStore = PageStore & SettingsStore & MediaStore & MenuStore & PostStore & UIStore;

// Create the combined store
export const useStore = create<AppStore>()(subscribeWithSelector((...a) => ({
  ...createPageSlice(...a),
  ...createSettingsSlice(...a),
  ...createMediaSlice(...a),
  ...createMenuSlice(...a),
  ...createPostSlice(...a),
  ...createUISlice(...a),
})));

// Cross-tab synchronization using BroadcastChannel
if (typeof window !== 'undefined') {
  const channel = new BroadcastChannel('nasim-store');
  
  // Listen for changes and broadcast to other tabs
  useStore.subscribe((state) => {
    channel.postMessage({
      type: 'STATE_UPDATE',
      payload: {
        pages: state.pages,
        currentPage: state.currentPage,
        settings: state.settings,
        media: state.media,
        menus: state.menus,
        posts: state.posts,
        currentPost: state.currentPost,
        // Don't sync UI state across tabs
      },
    });
  });
  
  // Listen for messages from other tabs
  channel.addEventListener('message', (event) => {
    if (event.data.type === 'STATE_UPDATE') {
      const { payload } = event.data;
      // Update store with data from other tabs (excluding UI state)
      useStore.setState((state) => ({
        ...state,
        ...payload,
      }));
    }
  });
}

// Export individual store hooks for convenience
export const usePageStore = () => useStore((state) => ({
  pages: state.pages,
  currentPage: state.currentPage,
  setPages: state.setPages,
  setCurrentPage: state.setCurrentPage,
  addPage: state.addPage,
  updatePage: state.updatePage,
  deletePage: state.deletePage,
  duplicatePage: state.duplicatePage,
  addBlock: state.addBlock,
  updateBlock: state.updateBlock,
  deleteBlock: state.deleteBlock,
  reorderBlocks: state.reorderBlocks,
}));

export const useSettingsStore = () => useStore((state) => ({
  settings: state.settings,
  setSettings: state.setSettings,
  updateSettings: state.updateSettings,
}));

export const useMediaStore = () => useStore((state) => ({
  media: state.media,
  setMedia: state.setMedia,
  addMedia: state.addMedia,
  updateMedia: state.updateMedia,
  deleteMedia: state.deleteMedia,
  getMediaById: state.getMediaById,
  getMediaByType: state.getMediaByType,
}));

export const useMenuStore = () => useStore((state) => ({
  menus: state.menus,
  setMenus: state.setMenus,
  addMenu: state.addMenu,
  updateMenu: state.updateMenu,
  deleteMenu: state.deleteMenu,
  addMenuItem: state.addMenuItem,
  updateMenuItem: state.updateMenuItem,
  deleteMenuItem: state.deleteMenuItem,
  reorderMenuItems: state.reorderMenuItems,
  getMenuByLocation: state.getMenuByLocation,
}));

export const usePostStore = () => useStore((state) => ({
  posts: state.posts,
  currentPost: state.currentPost,
  setPosts: state.setPosts,
  setCurrentPost: state.setCurrentPost,
  addPost: state.addPost,
  updatePost: state.updatePost,
  deletePost: state.deletePost,
  duplicatePost: state.duplicatePost,
  getPostsByStatus: state.getPostsByStatus,
  getPostsByCategory: state.getPostsByCategory,
  searchPosts: state.searchPosts,
}));

export const useUIStore = () => useStore((state) => ({
  isLoading: state.isLoading,
  loadingMessage: state.loadingMessage,
  modals: state.modals,
  sidebarOpen: state.sidebarOpen,
  sidebarCollapsed: state.sidebarCollapsed,
  darkMode: state.darkMode,
  rtlMode: state.rtlMode,
  notifications: state.notifications,
  pageBuilderMode: state.pageBuilderMode,
  selectedBlockId: state.selectedBlockId,
  draggedBlockId: state.draggedBlockId,
  setLoading: state.setLoading,
  openModal: state.openModal,
  closeModal: state.closeModal,
  toggleModal: state.toggleModal,
  setSidebarOpen: state.setSidebarOpen,
  setSidebarCollapsed: state.setSidebarCollapsed,
  toggleSidebar: state.toggleSidebar,
  setDarkMode: state.setDarkMode,
  setRtlMode: state.setRtlMode,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications,
  setPageBuilderMode: state.setPageBuilderMode,
  setSelectedBlockId: state.setSelectedBlockId,
  setDraggedBlockId: state.setDraggedBlockId,
}));