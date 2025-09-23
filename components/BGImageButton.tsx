import { useBackground } from "../context/BackgroundContext";
import { CiImageOn, CiImageOff } from "react-icons/ci";
import ButtonWithTip from "./ButtonWithTip";

export default function BGImageButton() {
  const { toggleImage, showImage } = useBackground();

  return (
    <ButtonWithTip
      tip="Toggle Background Image"
      side="bottom"
      action={toggleImage}
      icon={showImage ? <CiImageOff /> : <CiImageOn />}
    />
  );
}
