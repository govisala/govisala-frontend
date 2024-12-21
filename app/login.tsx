import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import React, { useState } from "react";
import { Divider } from "@/components/ui/divider";

function Login() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [passWd, setpassWd] = useState("");

  const handleSubmit = () => {
    if (passWd.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };
  return (
    <Box className="bg-slate-200 h-full m-6 rounded-3xl items-center pt-8">
      <Text className="font-p500 text-3xl mb-8">Login</Text>
      <VStack className="w-full bg-blue-100 max-w-[400px] rounded-xl border border-background-200 p-4">
        <FormControl isInvalid={isInvalid} size="lg" isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText className="font-p500">
              Email
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 font-p500 rounded-full" size={"sm"}>
            <InputField
              type="text"
              placeholder="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="font-p400"
            />
          </Input>
          <FormControlLabel>
            <FormControlLabelText className="font-p500">
              Password
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 rounded-full" size={"sm"}>
            <InputField
              type="password"
              placeholder="password"
              value={passWd}
              onChangeText={(text) => setpassWd(text)}
              className="font-p400"
            />
          </Input>
          <Button
            className="w-fit self-center mt-4 font-p500"
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText className="font-p600">Login</ButtonText>
          </Button>
          <VStack className="mt-4 flex flex-row items-center justify-center">
            <Divider className="w-32 bg-slate-500 mr-2" />
            <Text className="font-p400">OR</Text>
            <Divider className="w-32 bg-slate-500 ml-2" />
          </VStack>
          {/* -------------- Google sign in ------------ */}
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Login;
