import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

import { Link } from "expo-router";

function RootPage() {
  return (
    <Box className="bg-slate-200 h-full m-6 rounded-3xl items-center justify-evenly pt-8">
      <Link href="/login" asChild>
        <Button>
          <ButtonText>Login</ButtonText>
        </Button>
      </Link>
      <Link href="/register" asChild>
        <Button>
          <ButtonText>Register</ButtonText>
        </Button>
      </Link>
    </Box>
  );
}

export default RootPage;
