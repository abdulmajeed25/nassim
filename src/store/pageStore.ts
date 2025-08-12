import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Page, Block } from '../types';

export interface PageStore {
  pages: Page[];
  currentPage: Page | null;
  setPages: (pages: Page[]) => void;
  setCurrentPage: (page: Page | null) => void;
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  duplicatePage: (id: string) => void;
  addBlock: (pageId: string, block: Omit<Block, 'id'>) => void;
  updateBlock: (pageId: string, blockId: string, updates: Partial<Block>) => void;
  deleteBlock: (pageId: string, blockId: string) => void;
  reorderBlocks: (pageId: string, fromIndex: number, toIndex: number) => void;
}

export const createPageSlice: StateCreator<PageStore> = (set, get) => ({
  pages: [],
  currentPage: null,

  setPages: (pages) => set({ pages }),

  setCurrentPage: (page) => set({ currentPage: page }),

  addPage: (pageData) => {
    const newPage: Page = {
      ...pageData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      blocks: pageData.blocks || [],
    };
    
    set((state) => ({
      pages: [...state.pages, newPage],
      currentPage: newPage,
    }));
  },

  updatePage: (id, updates) => {
    set((state) => {
      const updatedPages = state.pages.map((page) =>
        page.id === id
          ? { ...page, ...updates, updatedAt: new Date() }
          : page
      );
      
      const updatedCurrentPage = state.currentPage?.id === id
        ? { ...state.currentPage, ...updates, updatedAt: new Date() }
        : state.currentPage;

      return {
        pages: updatedPages,
        currentPage: updatedCurrentPage,
      };
    });
  },

  deletePage: (id) => {
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
      currentPage: state.currentPage?.id === id ? null : state.currentPage,
    }));
  },

  duplicatePage: (id) => {
    const { pages } = get();
    const originalPage = pages.find((page) => page.id === id);
    
    if (originalPage) {
      const duplicatedPage: Page = {
        ...originalPage,
        id: uuidv4(),
        title: `${originalPage.title} - نسخة`,
        slug: `${originalPage.slug}-copy`,
        createdAt: new Date(),
        updatedAt: new Date(),
        blocks: originalPage.blocks.map((block) => ({
          ...block,
          id: uuidv4(),
        })),
      };
      
      set((state) => ({
        pages: [...state.pages, duplicatedPage],
      }));
    }
  },

  addBlock: (pageId, blockData) => {
    const newBlock: Block = {
      ...blockData,
      id: uuidv4(),
    };

    set((state) => {
      const updatedPages = state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              blocks: [...page.blocks, newBlock],
              updatedAt: new Date(),
            }
          : page
      );

      const updatedCurrentPage = state.currentPage?.id === pageId
        ? {
            ...state.currentPage,
            blocks: [...state.currentPage.blocks, newBlock],
            updatedAt: new Date(),
          }
        : state.currentPage;

      return {
        pages: updatedPages,
        currentPage: updatedCurrentPage,
      };
    });
  },

  updateBlock: (pageId, blockId, updates) => {
    set((state) => {
      const updatedPages = state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              blocks: page.blocks.map((block) =>
                block.id === blockId ? { ...block, ...updates } : block
              ),
              updatedAt: new Date(),
            }
          : page
      );

      const updatedCurrentPage = state.currentPage?.id === pageId
        ? {
            ...state.currentPage,
            blocks: state.currentPage.blocks.map((block) =>
              block.id === blockId ? { ...block, ...updates } : block
            ),
            updatedAt: new Date(),
          }
        : state.currentPage;

      return {
        pages: updatedPages,
        currentPage: updatedCurrentPage,
      };
    });
  },

  deleteBlock: (pageId, blockId) => {
    set((state) => {
      const updatedPages = state.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              blocks: page.blocks.filter((block) => block.id !== blockId),
              updatedAt: new Date(),
            }
          : page
      );

      const updatedCurrentPage = state.currentPage?.id === pageId
        ? {
            ...state.currentPage,
            blocks: state.currentPage.blocks.filter((block) => block.id !== blockId),
            updatedAt: new Date(),
          }
        : state.currentPage;

      return {
        pages: updatedPages,
        currentPage: updatedCurrentPage,
      };
    });
  },

  reorderBlocks: (pageId, fromIndex, toIndex) => {
    set((state) => {
      const updatedPages = state.pages.map((page) => {
        if (page.id === pageId) {
          const newBlocks = [...page.blocks];
          const [movedBlock] = newBlocks.splice(fromIndex, 1);
          newBlocks.splice(toIndex, 0, movedBlock);
          
          return {
            ...page,
            blocks: newBlocks,
            updatedAt: new Date(),
          };
        }
        return page;
      });

      const updatedCurrentPage = state.currentPage?.id === pageId
        ? (() => {
            const newBlocks = [...state.currentPage.blocks];
            const [movedBlock] = newBlocks.splice(fromIndex, 1);
            newBlocks.splice(toIndex, 0, movedBlock);
            
            return {
              ...state.currentPage,
              blocks: newBlocks,
              updatedAt: new Date(),
            };
          })()
        : state.currentPage;

      return {
        pages: updatedPages,
        currentPage: updatedCurrentPage,
      };
    });
  },
});