import React, { useState, useEffect } from "react";
import axios from "axios";

interface SellerPost {
  status: string;
  id: number;
  item_name: string;
  quantity: string;
  location: string;
  area: string;
  unit_price: number;
  quality_grade: string;
  additional_notes: string;
  harvest_date: string;
  images: Array<{ image_path: string }>;
}

const SellerPostsContext = React.createContext<{
  sellerPosts: SellerPost[];
  setSellerPosts: React.Dispatch<React.SetStateAction<SellerPost[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPosts: () => void;
}>({
  sellerPosts: [],
  setSellerPosts: () => {},
  loading: true,
  setLoading: () => {},
  refreshPosts: () => {},
});

// Custom hook to use the seller posts context
export const useSellerPosts = () => {
  return React.useContext(SellerPostsContext);
};

// Provider component for seller posts
export const SellerPostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sellerPosts, setSellerPosts] = useState<SellerPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = () => {
    setLoading(true);
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + "/seller/seller-listings")
      .then((res) => {
        setSellerPosts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <SellerPostsContext.Provider
      value={{
        sellerPosts,
        setSellerPosts,
        loading,
        setLoading,
        refreshPosts,
      }}
    >
      {children}
    </SellerPostsContext.Provider>
  );
};
