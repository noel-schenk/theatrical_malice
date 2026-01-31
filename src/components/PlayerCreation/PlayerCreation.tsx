import type { FC } from "react";
import { PlayerCreationWrapper } from "./PlayerCreation.styled";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { mainState } from "@/state/mainState";
import { useSnapshot } from "valtio";

interface PlayerCreationProps {}

const PlayerCreation: FC<PlayerCreationProps> = () => {
  const mainSnap = useSnapshot(mainState);
  return (
    <PlayerCreationWrapper>
      <div className="flex flex-wrap gap-4 p-4">
        <Card className="grow">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="typography">
                <h2>Create your character</h2>
              </div>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Character Name"
                  value={mainSnap.characterName}
                  onChange={(ev) => (mainState.characterName = ev.target.value)}
                />
                <Button
                  disabled={mainState.characterName.length < 4}
                  onClick={() => (mainState.showNavigation = "lobby")}
                >
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="grow">
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4">
                <div className="typography">
                  <h3>This is what your Character will look like</h3>
                </div>
                <Button className="grow">Randomize Character</Button>
              </div>
              <div className="flex flex-col gap-4 items-center">
                <img
                  className="w-50 h-100"
                  src="https://placecats.com/50/100"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlayerCreationWrapper>
  );
};

export default PlayerCreation;
