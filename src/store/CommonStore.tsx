import { PostDTO } from "@/types/common.dto";
import { create } from "zustand";

type Store = {
  posts: PostDTO[];
  setPosts: (next: PostDTO[]) => void;
  sidebarActive: boolean;
  setSidebar: (next: boolean) => void;
  count: number;
  inc: () => void;
};

export const useCommonStore = create<Store>((set) => ({
  posts: [],
  setPosts: (next: PostDTO[]) => set({ posts: next }),
  sidebarActive: true,
  setSidebar: (next: boolean) => set({ sidebarActive: next }),
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
