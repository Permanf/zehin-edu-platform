import { Center } from "@mantine/core";
import Lottie from "lottie-react";
import Loader from "../assets/notfound.json";

const NotFound = () => (
  <Center className="w-full h-full flex flex-col items-center justify-center">
    <Lottie animationData={Loader} loop={true} className="notfound h-96" />
  </Center>
);

export default NotFound;