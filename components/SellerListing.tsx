import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "react-native";

function SellerListing() {
  const [ItemName, setitemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [UnitPrice, setUnitPrice] = useState("");
  const [Quality, setQuality] = useState("");
  const [Location, setLocation] = useState("");
  const [Area, setArea] = useState("");
  const [EffectiveDate, setEffectiveDate] = useState("");
  const [DeliveryPickup, setDeliveryPickup] = useState("");

  return (
    <SafeAreaView>
      <Box className="bg-[#C0D85F] h-full rounded-t-[40px] px-4">
        <Center>
          <Text className="text-4xl font-p600 mt-8 p-1">Seller Listing</Text>
          <Pressable className="w-30 h-30 rounded-full bg-[#D9D9D9] justify-center items-center"></Pressable>
          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Item Name"
              value={ItemName}
              onChangeText={(text) => setitemName(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Quantity"
              value={Quantity}
              onChangeText={(text) => setQuantity(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Unit Price"
              value={UnitPrice}
              onChangeText={(text) => setUnitPrice(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Quality Grade"
              value={Quality}
              onChangeText={(text) => setQuality(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Location"
              value={Location}
              onChangeText={(text) => setLocation(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Area"
              value={Area}
              onChangeText={(text) => setArea(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Effective Date"
              value={EffectiveDate}
              onChangeText={(text) => setEffectiveDate(text)}
              className="font-p400"
            />
          </Input>

          <Input className="bg-[#FCFFE0] rounded-full mt-8 h-16" size={"xl"}>
            <InputField
              type="text"
              placeholder="Delivery or Pickup"
              value={DeliveryPickup}
              onChangeText={(text) => setDeliveryPickup(text)}
              className="font-p400"
            />
          </Input>

          <Button className="bg-[#4E7456] h-14 rounded-full">
            <ButtonText className="font-p500 text-[#FCFFE0] text-2xl">
              Add List
            </ButtonText>
          </Button>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
