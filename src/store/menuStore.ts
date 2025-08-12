import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Menu, MenuItem } from '../types';

export interface MenuStore {
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMenu: (id: string, updates: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
  addMenuItem: (menuId: string, item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (menuId: string, itemId: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (menuId: string, itemId: string) => void;
  reorderMenuItems: (menuId: string, fromIndex: number, toIndex: number) => void;
  getMenuByLocation: (location: string) => Menu | undefined;
}

const defaultMenus: Menu[] = [
  {
    id: 'header-menu',
    name: 'القائمة الرئيسية',
    location: 'header',
    items: [
      {
        id: 'home',
        label: 'الرئيسية',
        url: '/',
        type: 'internal',
        order: 1,
        isActive: true,
      },
      {
        id: 'services',
        label: 'خدماتنا',
        url: '/services',
        type: 'internal',
        order: 2,
        isActive: true,
        children: [
          {
            id: 'maintenance',
            label: 'صيانة المكيفات',
            url: '/services/maintenance',
            type: 'internal',
            order: 1,
            isActive: true,
          },
          {
            id: 'installation',
            label: 'تركيب المكيفات',
            url: '/services/installation',
            type: 'internal',
            order: 2,
            isActive: true,
          },
          {
            id: 'cleaning',
            label: 'تنظيف المكيفات',
            url: '/services/cleaning',
            type: 'internal',
            order: 3,
            isActive: true,
          },
        ],
      },
      {
        id: 'about',
        label: 'من نحن',
        url: '/about',
        type: 'internal',
        order: 3,
        isActive: true,
      },
      {
        id: 'contact',
        label: 'اتصل بنا',
        url: '/contact',
        type: 'internal',
        order: 4,
        isActive: true,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'footer-menu',
    name: 'قائمة التذييل',
    location: 'footer',
    items: [
      {
        id: 'privacy',
        label: 'سياسة الخصوصية',
        url: '/privacy',
        type: 'internal',
        order: 1,
        isActive: true,
      },
      {
        id: 'terms',
        label: 'شروط الاستخدام',
        url: '/terms',
        type: 'internal',
        order: 2,
        isActive: true,
      },
      {
        id: 'sitemap',
        label: 'خريطة الموقع',
        url: '/sitemap',
        type: 'internal',
        order: 3,
        isActive: true,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const createMenuSlice: StateCreator<MenuStore> = (set, get) => ({
  menus: defaultMenus,

  setMenus: (menus) => set({ menus }),

  addMenu: (menuData) => {
    const newMenu: Menu = {
      ...menuData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      menus: [...state.menus, newMenu],
    }));
  },

  updateMenu: (id, updates) => {
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === id
          ? { ...menu, ...updates, updatedAt: new Date() }
          : menu
      ),
    }));
  },

  deleteMenu: (id) => {
    set((state) => ({
      menus: state.menus.filter((menu) => menu.id !== id),
    }));
  },

  addMenuItem: (menuId, itemData) => {
    const newItem: MenuItem = {
      ...itemData,
      id: uuidv4(),
    };

    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              items: [...menu.items, newItem],
              updatedAt: new Date(),
            }
          : menu
      ),
    }));
  },

  updateMenuItem: (menuId, itemId, updates) => {
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              items: menu.items.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
              updatedAt: new Date(),
            }
          : menu
      ),
    }));
  },

  deleteMenuItem: (menuId, itemId) => {
    set((state) => ({
      menus: state.menus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              items: menu.items.filter((item) => item.id !== itemId),
              updatedAt: new Date(),
            }
          : menu
      ),
    }));
  },

  reorderMenuItems: (menuId, fromIndex, toIndex) => {
    set((state) => ({
      menus: state.menus.map((menu) => {
        if (menu.id === menuId) {
          const newItems = [...menu.items];
          const [movedItem] = newItems.splice(fromIndex, 1);
          newItems.splice(toIndex, 0, movedItem);
          
          return {
            ...menu,
            items: newItems,
            updatedAt: new Date(),
          };
        }
        return menu;
      }),
    }));
  },

  getMenuByLocation: (location) => {
    const { menus } = get();
    return menus.find((menu) => menu.location === location);
  },
});