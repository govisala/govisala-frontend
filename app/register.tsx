import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelperText,
  FormControlHelper,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import React, { useState } from "react";
import { Link } from "expo-router";

function Register() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [passWd, setpassWd] = useState("");
  const [passWdConf, setpassWdConf] = useState("");

  const handleSubmit = () => {
    if (passWd.length < 6) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  };
  return (
    <Box className="bg-slate-200 h-full m-6 rounded-3xl items-center pt-8">
      <Text className="font-p500 text-3xl mb-8">Register</Text>
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
          <FormControlLabel>
            <FormControlLabelText className="font-p500">
              Confirm Password
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1 rounded-full" size={"sm"}>
            <InputField
              type="password"
              placeholder="confirm password"
              value={passWdConf}
              onChangeText={(text) => setpassWdConf(text)}
              className="font-p400"
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText className="font-p400 text-sm">
              Must be atleast 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText className="font-p400 text-base">
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
          <Button
            className="w-fit self-center mt-4 font-p500"
            size="sm"
            onPress={handleSubmit}
          >
            <ButtonText className="font-p600">Register</ButtonText>
          </Button>
          <FormControlHelper className="self-center">
            <FormControlHelperText className="font-p400 text-sm text-center">
              If you don't have an account, please{" \n"}
              <Link href="/login" asChild>
                <Text className="text-blue-500 font-p400 text-sm">
                  login from here.
                </Text>
              </Link>
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>
      </VStack>
    </Box>
  );
}

export default Register;
