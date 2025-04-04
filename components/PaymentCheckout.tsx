import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { CheckIcon } from "@gluestack-ui/themed";
import { styled } from "nativewind";

// Styled components with NativeWind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

// Credit card component
const CreditCardImage = () => (
  <StyledView className="bg-blue-500 rounded-lg p-4 mx-2 mb-6 h-48">
    <StyledView className="flex-row justify-between mb-6">
      <StyledView className="w-12 h-8 bg-gray-300 rounded-md" />
      <StyledView className="w-8 h-8">
        <StyledText className="text-white text-xl">
          <Text>📶</Text>
        </StyledText>
      </StyledView>
    </StyledView>

    <StyledText className="text-white text-lg font-medium mb-4">
      1234 5678 9901 2345
    </StyledText>

    <StyledView className="flex-row justify-between">
      <StyledView>
        <StyledText className="text-white text-xs">VALID THRU</StyledText>
        <StyledText className="text-white">05/00</StyledText>
      </StyledView>
      <StyledView>
        <StyledText className="text-white text-xs">CARD HOLDER</StyledText>
        <StyledText className="text-white">A N OTHER</StyledText>
      </StyledView>
    </StyledView>
  </StyledView>
);

// Form input component
const FormInput = ({ label, placeholder, secureTextEntry = false }) => (
  <StyledView className="mb-3">
    <StyledTextInput
      placeholder={placeholder || label}
      className="bg-white rounded-full p-3 px-4 border border-gray-200"
      secureTextEntry={secureTextEntry}
    />
  </StyledView>
);

// Checkbox component
const Checkbox = ({ label, checked, onToggle }) => (
  <StyledView className="flex-row items-center mb-4">
    <StyledTouchableOpacity
      onPress={onToggle}
      className={`w-5 h-5 border ${
        checked ? "bg-green-600 border-green-600" : "border-gray-400"
      } rounded mr-2 items-center justify-center`}
    >
      {checked && <CheckIcon size="xs" color="white" />}
    </StyledTouchableOpacity>
    <StyledText className="text-gray-600 text-sm">{label}</StyledText>
  </StyledView>
);

const CheckoutScreen = () => {
  const [saveCard, setSaveCard] = useState(false);

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledScrollView>
        <StyledView className="p-4 bg-yellow-100 flex-1">
          {/* Header */}
          <StyledView className="flex-row items-center mb-4">
            <StyledTouchableOpacity>
              <StyledText className="text-2xl">←</StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-xl font-semibold ml-4">
              Check Out
            </StyledText>
          </StyledView>

          <StyledText className="text-gray-700 mb-4">
            Select payment method
          </StyledText>

          {/* Credit Card Display */}
          <CreditCardImage />

          {/* Form */}
          <StyledView className="mt-2">
            <FormInput
              label="Card Holder's name"
              placeholder="Card Holder's name"
            />
            <FormInput label="Card Number" placeholder="Card Number" />
            <FormInput label="Expiry Date" placeholder="Expiry Date" />
            <FormInput label="CVV" placeholder="CVV" secureTextEntry={true} />
          </StyledView>

          {/* Scan card option */}
          <StyledView className="flex-row items-center mt-2 mb-4">
            <StyledText className="text-green-800 mr-2">📷</StyledText>
            <StyledText className="text-green-800">Scan your card</StyledText>
          </StyledView>

          {/* Save card checkbox */}
          <Checkbox
            label="Save your card information it's safe here"
            checked={saveCard}
            onToggle={() => setSaveCard(!saveCard)}
          />

          {/* Pay button */}
          <StyledTouchableOpacity className="bg-green-700 rounded-lg p-3 items-center mt-2">
            <StyledText className="text-white font-medium">Pay now</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default CheckoutScreen;
