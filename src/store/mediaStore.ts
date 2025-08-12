import { StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { MediaFile } from '../types';

export interface MediaStore {
  media: MediaFile[];
  setMedia: (media: MediaFile[]) => void;
  addMedia: (file: Omit<MediaFile, 'id' | 'createdAt'>) => void;
  updateMedia: (id: string, updates: Partial<MediaFile>) => void;
  deleteMedia: (id: string) => void;
  getMediaById: (id: string) => MediaFile | undefined;
  getMediaByType: (type: string) => MediaFile[];
}

export const createMediaSlice: StateCreator<MediaStore> = (set, get) => ({
  media: [],

  setMedia: (media) => set({ media }),

  addMedia: (fileData) => {
    const newFile: MediaFile = {
      ...fileData,
      id: uuidv4(),
      createdAt: new Date(),
    };
    
    set((state) => ({
      media: [...state.media, newFile],
    }));
  },

  updateMedia: (id, updates) => {
    set((state) => ({
      media: state.media.map((file) =>
        file.id === id ? { ...file, ...updates } : file
      ),
    }));
  },

  deleteMedia: (id) => {
    set((state) => ({
      media: state.media.filter((file) => file.id !== id),
    }));
  },

  getMediaById: (id) => {
    const { media } = get();
    return media.find((file) => file.id === id);
  },

  getMediaByType: (type) => {
    const { media } = get();
    return media.filter((file) => file.type.startsWith(type));
  },
});