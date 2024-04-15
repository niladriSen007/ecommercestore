import { createStore } from "zustand/vanilla";

export type UserState = {
  signedInUser: UserType;
};

export type UserActions = {

  
  addOrRemoveFromWishlist: (productId: string) => void;
  setSignedInUser: (user: UserType) => void;
};

export type UserStore = UserState & UserActions;

export const initUsererStore = (): UserState => {
  return { signedInUser: {} as UserType };
};

export const defaultInitUserState: UserState = {
  signedInUser: {} as UserType,
};

export const createUserStore = (
  initState: UserState = defaultInitUserState
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setSignedInUser: (user: UserType) => {
      set((state: any) => ({
        signedInUser: user,
      }));
    },
    addOrRemoveFromWishlist: (productId: string) =>
      set((state) => {
        const isWishListed = state.signedInUser.wishlist.includes(productId);
        if (isWishListed) {
          state.signedInUser.wishlist = state.signedInUser.wishlist.filter(
            (id: string) => id !== productId
          );
        } else {
          state.signedInUser.wishlist.push(productId);
        }
        return state;
      }),
  }));
};
