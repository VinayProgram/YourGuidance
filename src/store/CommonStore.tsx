import { create } from "zustand";
import { User } from "firebase/auth"; // Firebase Auth User type
import { PostDTO } from "@/types/common.dto";
import { auth } from "@/config";

// Define the store structure
type Store = {
  posts: PostDTO[];
  setPosts: (next: PostDTO[]) => void;
  sidebarActive: boolean;
  setSidebar: (next: boolean) => void;
  count: number;
  inc: () => void;
  user: User | null;  // Add the user to the store
  fetchUserProfile: () => void;  // Add method to fetch the user profile
  setUser: (user: User | null) => void; // Add method to set user manually
};

// Zustand store
export const useCommonStore = create<Store>((set) => ({
  posts: [],
  setPosts: (next: PostDTO[]) => set({ posts: next }),
  sidebarActive: true,
  setSidebar: (next: boolean) => set({ sidebarActive: next }),
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  user: null, 
  setUser: (user: User | null) => set({ user }),  // Method to set user manually
  
  fetchUserProfile: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    });
    return () => unsubscribe();  // Clean up the listener
  },
}));
