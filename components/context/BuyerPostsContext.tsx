import React, { useState, useEffect } from "react";
import axios from "axios";

interface BuyerPost {
  id: number;
  item_name: string;
  quantity: string;
  location: string;
  area: string;
  bid_from: number;
  bid_to: number;
  quality_grade: string;
  additional_notes: string;
  deliveryType: string;
  required_date: string;
  images: Array<{ image_path: string }>;
}

const BuyerPostsContext = React.createContext<{
  buyerPosts: BuyerPost[];
  setBuyerPosts: React.Dispatch<React.SetStateAction<BuyerPost[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPosts: () => void;
}>({
  buyerPosts: [],
  setBuyerPosts: () => {},
  loading: true,
  setLoading: () => {},
  refreshPosts: () => {},
});

// Custom hook to use the buyer posts context
export const useBuyerPosts = () => {
  return React.useContext(BuyerPostsContext);
};

// Provider component for buyer posts
export const BuyerPostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [buyerPosts, setBuyerPosts] = useState<BuyerPost[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = () => {
    setLoading(true);
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + "/buyer/buyer-requests")
      .then((res) => {
        setBuyerPosts(res.data.data);
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
    <BuyerPostsContext.Provider
      value={{
        buyerPosts,
        setBuyerPosts,
        loading,
        setLoading,
        refreshPosts,
      }}
    >
      {children}
    </BuyerPostsContext.Provider>
  );
};
