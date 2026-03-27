import { create } from 'zustand';

interface TipWriteState {
  title: string;
  content: string;
  images: File[];
  categories: string[];

  isModalOpen: boolean;

  setTitle: (v: string) => void;
  setContent: (v: string) => void;
  addImage: (f: File) => void;
  removeImage: (idx: number) => void;
  toggleCategory: (c: string) => void;

  openModal: () => void;
  closeModal: () => void;
  reset: () => void;
}

export const useTipWriteStore = create<TipWriteState>(set => ({
  title: '',
  content: '',
  images: [],
  categories: [],

  isModalOpen: false,

  setTitle: title => set({ title }),
  setContent: content => set({ content }),

  addImage: file =>
    set(s => (s.images.length < 5 ? { images: [...s.images, file] } : s)),

  removeImage: idx =>
    set(s => ({
      images: s.images.filter((_, i) => i !== idx),
    })),

  toggleCategory: c =>
    set(s => ({
      categories: s.categories.includes(c)
        ? s.categories.filter(v => v !== c)
        : s.categories.length < 5
          ? [...s.categories, c]
          : s.categories,
    })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  reset: () =>
    set({
      title: '',
      content: '',
      images: [],
      categories: [],
      isModalOpen: false,
    }),
}));
