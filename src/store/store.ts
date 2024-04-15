import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userProfileStore = (set: any) => ({
  signedInUser: {} as UserType,

  setSignedInUser: (user: UserType) => {
    set((state: any) => ({
      signedInUser: user,
    }));
  },

  addOrRemoveFromWishlist: (productId: string) => {
    set((state: any) => {
      const isWishListed = state.signedInUser.wishlist.includes(productId);
      if (isWishListed) {
        state.signedInUser.wishlist = state.signedInUser.wishlist.filter(
          (id: string) => id !== productId
        );
      } else {
        state.signedInUser.wishlist.push(productId);
      }
      return state;
    });
  }
});

export const useUserProfileStore = create(
  devtools(persist(userProfileStore, { name: "user" }))
);
