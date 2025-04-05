import React, { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  Text,
  Button,
  Icon,
  Divider,
  VStack,
  HStack,
  Box,
  Pressable,
  Input,
} from "@gluestack-ui/themed";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Organic Apples",
      price: 2.99,
      quantity: 2,
      unit: "kg",
      image: "https://via.placeholder.com/100",
      category: "fruits",
    },
    {
      id: "2",
      name: "Fresh Spinach",
      price: 1.49,
      quantity: 1,
      unit: "bunch",
      image: "https://via.placeholder.com/100",
      category: "vegetables",
    },
    {
      id: "3",
      name: "Red Tomatoes",
      price: 3.29,
      quantity: 1.5,
      unit: "kg",
      image: "https://via.placeholder.com/100",
      category: "vegetables",
    },
    {
      id: "4",
      name: "Fresh Bananas",
      price: 1.99,
      quantity: 1,
      unit: "dozen",
      image: "https://via.placeholder.com/100",
      category: "fruits",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Discount calculation
  const discount = promoApplied ? subtotal * 0.1 : 0;

  // Delivery fee
  const deliveryFee = 2.99;

  // Calculate total
  const total = subtotal - discount + deliveryFee;

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "fresh10") {
      setPromoApplied(true);
      alert("Promo code applied successfully!");
    } else {
      alert("Invalid promo code");
    }
  };

  // Render empty cart
  if (cartItems.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-4">
        <Icon as={MaterialIcons} name="shopping-cart" size="6xl" color="gray" />
        <Text className="text-xl font-semibold mt-4 mb-2">
          Your cart is empty
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Looks like you haven't added any items to your cart yet
        </Text>
        <Button
          onPress={() => navigation?.navigate("Shop")}
          className="bg-green-600 w-full"
        >
          <Text className="text-white font-semibold">Start Shopping</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white py-4 px-4 flex-row items-center justify-between shadow-sm">
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon as={MaterialIcons} name="arrow-back" size="xl" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">My Cart</Text>
        <Text className="text-green-600 font-semibold">
          {cartItems.length} items
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Cart Items */}
        <View className="mt-2 bg-white rounded-lg shadow-sm mx-2">
          {cartItems.map((item, index) => (
            <View key={item.id}>
              <View className="p-4 flex-row">
                {/* Product Image */}
                <View className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    source={{ uri: item.image }}
                    className="h-full w-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-0 right-0 bg-green-100 px-1 rounded-bl-lg">
                    <Text className="text-xs text-green-700">
                      {item.category}
                    </Text>
                  </View>
                </View>

                {/* Product Details */}
                <View className="ml-3 flex-1 justify-between">
                  <View>
                    <Text className="font-semibold">{item.name}</Text>
                    <Text className="text-gray-500 text-sm">
                      ${item.price.toFixed(2)} / {item.unit}
                    </Text>
                  </View>

                  {/* Price and Controls */}
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </Text>

                    {/* Quantity Controls */}
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(item.id, item.quantity - 0.5)
                        }
                        className="h-8 w-8 bg-gray-200 rounded-full items-center justify-center"
                      >
                        <Icon as={Feather} name="minus" size="sm" />
                      </TouchableOpacity>

                      <Text className="mx-3 min-w-8 text-center">
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() =>
                          updateQuantity(item.id, item.quantity + 0.5)
                        }
                        className="h-8 w-8 bg-green-500 rounded-full items-center justify-center"
                      >
                        <Icon
                          as={Feather}
                          name="plus"
                          size="sm"
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Divider except for last item */}
              {index < cartItems.length - 1 && <Divider />}
            </View>
          ))}
        </View>

        {/* Promo Code Section */}
        <View className="mx-2 mt-4 bg-white p-4 rounded-lg shadow-sm">
          <Text className="font-semibold mb-2">Promo Code</Text>
          <HStack space="md">
            <Input
              flex={1}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter promo code"
              className="bg-gray-100"
            />
            <Button
              onPress={applyPromoCode}
              className={promoApplied ? "bg-gray-400" : "bg-green-600"}
              disabled={promoApplied}
            >
              <Text className="text-white">Apply</Text>
            </Button>
          </HStack>
          {promoApplied && (
            <Text className="text-green-600 text-sm mt-1">
              Promo code FRESH10 applied (10% off)
            </Text>
          )}
        </View>

        {/* Order Summary */}
        <View className="mx-2 mt-4 bg-white p-4 rounded-lg shadow-sm">
          <Text className="font-semibold mb-3">Order Summary</Text>

          <VStack space="sm">
            <HStack justifyContent="space-between">
              <Text className="text-gray-600">Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <Text className="text-gray-600">Delivery Fee</Text>
              <Text>${deliveryFee.toFixed(2)}</Text>
            </HStack>

            {promoApplied && (
              <HStack justifyContent="space-between">
                <Text className="text-green-600">Discount (10%)</Text>
                <Text className="text-green-600">-${discount.toFixed(2)}</Text>
              </HStack>
            )}

            <Divider my={2} />

            <HStack justifyContent="space-between">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold text-lg">${total.toFixed(2)}</Text>
            </HStack>
          </VStack>
        </View>

        {/* Delivery Options */}
        <View className="mx-2 mt-4 bg-white p-4 rounded-lg shadow-sm">
          <Text className="font-semibold mb-3">Delivery Method</Text>

          <HStack space="md">
            <Pressable
              flex={1}
              className="border border-green-500 rounded-lg p-3 items-center bg-green-50"
            >
              <Icon
                as={MaterialIcons}
                name="delivery-dining"
                size="xl"
                color="green"
              />
              <Text className="text-sm mt-1 text-green-700">Home Delivery</Text>
              <Text className="text-xs text-gray-500">45-60 min</Text>
            </Pressable>

            <Pressable
              flex={1}
              className="border border-gray-300 rounded-lg p-3 items-center"
            >
              <Icon as={MaterialIcons} name="store" size="xl" color="gray" />
              <Text className="text-sm mt-1">Store Pickup</Text>
              <Text className="text-xs text-gray-500">15-20 min</Text>
            </Pressable>
          </HStack>
        </View>

        {/* Add notes section */}
        <View className="mx-2 mt-4 bg-white p-4 rounded-lg shadow-sm mb-20">
          <Text className="font-semibold mb-2">Add Notes</Text>
          <Input
            placeholder="Special instructions for your delivery"
            multiline
            numberOfLines={3}
            className="bg-gray-100"
          />
        </View>
      </ScrollView>

      {/* Fixed Checkout Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <Button
          onPress={() => navigation?.navigate("Checkout")}
          className="bg-green-600"
        >
          <HStack space="md">
            <Text className="text-white font-semibold">
              Proceed to Checkout
            </Text>
            <Text className="text-white font-semibold">
              ${total.toFixed(2)}
            </Text>
          </HStack>
        </Button>
      </View>
    </View>
  );
};

export default CartScreen;
