import { useEffect, useRef, type FC } from "react";
import { MaskWrapper } from "./Mask.styled";
import type { MaskDefinition } from "../../models/MaskDefinition";
import { MASK_HEIGHT, MASK_WIDTH } from "../consts";
import { loadAllImages } from "@/api/functions";
import Face from '../../assets/face/Face.png';

interface MaskProps {
  maskDefinition: MaskDefinition;
}

const images = await loadAllImages();

const Mask: FC<MaskProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    (async () => {
      context.drawImage(images[Face], 0, 0, MASK_WIDTH, MASK_HEIGHT);
  
      context.drawImage(images[props.maskDefinition.url], 0, 0, MASK_WIDTH, MASK_HEIGHT);
  
      props.maskDefinition.features.forEach(async (feature) => {
        context.save();
        if (feature.position === 'right') {
          context.translate(MASK_WIDTH, 0);
          context.scale(-1, 1);
        }
  
        context.drawImage(images[feature.url], 0, 0, MASK_WIDTH, MASK_HEIGHT);
        context.restore();
      });
    })();
  }, [props.maskDefinition]);

  return <MaskWrapper>
    <canvas ref={canvasRef} width={MASK_WIDTH} height={MASK_HEIGHT}></canvas>
  </MaskWrapper>
};

export default Mask;
