import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { specialBusinessLogin } from "../utils/firebase";
import { setUserInfos } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
const Auth = () => {
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const showLoggedSuccessfullyToast = () =>
    toast({
      title: "Login Eseguito, Buon Lavoro.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  const showCouldNotBeLoggedInToast = () =>
    toast({
      title: "ID Azienda o Password Errati!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  const onSubmit = async (data: any) => {
    const { idAzienda, password } = data;
    await specialBusinessLogin(idAzienda, password)
      .then((docData) => {
        dispatch(
          setUserInfos(docData)
        );
        showLoggedSuccessfullyToast();
      })
      .catch(() => showCouldNotBeLoggedInToast())
  };
  const { register, handleSubmit } = useForm();
  return (
    <>
      <Container mt="8">
        <Stack spacing={3}>
          <Center>
            <Image boxSize="150px" src="../res/logo.png" />
          </Center>
          <Center>
            <Text fontSize="3xl">Log-In</Text>
          </Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              border="2px"
              borderColor="green.500"
              placeholder="ID Azienda"
              size="lg"
              name="idAzienda"
              ref={register}
              autoFocus
            />
            <InputGroup>
              <Input
                type={showPasswordText ? "text" : "password"}
                border="2px"
                mt="1"
                borderColor="green.500"
                placeholder="Password"
                size="lg"
                name="password"
                ref={register}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  mt="4"
                  variant="outline"
                  onClick={() => setShowPasswordText(!showPasswordText)}
                >
                  {showPasswordText ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              size="lg"
              border="2px"
              borderColor="green.500"
              variant="outline"
              type="submit"
              mt="1"
              width="100%"
            >
              Log In
            </Button>
          </form>
        </Stack>
      </Container>
    </>
  );
};

export default Auth;
