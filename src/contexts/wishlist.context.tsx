import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useLocalStorage } from "@utils/use-local-storage";

export interface WishlistItem {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail?: string;
    [key: string]: any;
  };
  price: number;
  sale_price?: number;
  [key: string]: any;
}

interface WishlistContextState {
  items: WishlistItem[];
  addItemToWishlist: (item: WishlistItem) => void;
  removeItemFromWishlist: (id: WishlistItem["id"]) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: WishlistItem["id"]) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextState | undefined>(undefined);
WishlistContext.displayName = "WishlistContext";

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(`useWishlist must be used within a WishlistProvider`);
  }
  return context;
};

import { toast } from "@utils/toast";

export const WishlistProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [savedWishlist, saveWishlist] = useLocalStorage(
    "chawkbazar-wishlist",
    JSON.stringify([])
  );

  const [items, setItems] = useState<WishlistItem[]>([]);

  // Hydrate from localStorage on mount (safe for SSR)
  useEffect(() => {
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage", e);
      }
    }
  }, [savedWishlist]);

  const addItemToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const updated = [...prev, item];
      saveWishlist(JSON.stringify(updated));
      return updated;
    });
    toast.success("Added to Wishlist", `${item.name} has been added to your wishlist.`);
  };

  const removeItemFromWishlist = (id: WishlistItem["id"]) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveWishlist(JSON.stringify(updated));
      return updated;
    });
    if (item) {
      toast.success("Removed from Wishlist", `${item.name} has been removed.`);
    }
  };

  const toggleWishlist = (item: WishlistItem) => {
    const exists = items.some((i) => i.id === item.id);
    setItems((prev) => {
      const updated = exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];
      saveWishlist(JSON.stringify(updated));
      return updated;
    });
    if (exists) {
      toast.success("Removed from Wishlist", `${item.name} has been removed.`);
    } else {
      toast.success("Added to Wishlist", `${item.name} has been added to your wishlist.`);
    }
  };

  const isInWishlist = (id: WishlistItem["id"]) => {
    return items.some((i) => i.id === id);
  };

  const value = useMemo(
    () => ({
      items,
      addItemToWishlist,
      removeItemFromWishlist,
      toggleWishlist,
      isInWishlist,
      totalItems: items.length,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
