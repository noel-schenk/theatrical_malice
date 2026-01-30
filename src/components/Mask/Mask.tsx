import type { FC } from "react";
import { MaskWrapper } from "./Mask.styled";

interface MaskProps {
  id: number;
}

const Mask: FC<MaskProps> = () => <MaskWrapper>Mask Component</MaskWrapper>;

export default Mask;
