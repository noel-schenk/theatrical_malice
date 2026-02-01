import type { FC } from 'react';
import { EndScreenWrapper } from './EndScreen.styled';
import { Card, CardContent } from '../ui/card';
import { useSnapshot } from 'valtio';
import { mainState } from '@/state/mainState';

interface EndScreenProps {}

const EndScreen: FC<EndScreenProps> = () => {
   const mainSnap = useSnapshot(mainState);

   return <EndScreenWrapper>
      <div className="absolute z-50 flex flex-wrap gap-4 p-4 w-100 shrink max-w-[calc(100vw-10px)]">
         <Card className="grow">
            <CardContent>
               <div className="flex flex-col gap-4 items-center text-center">
                  <div className="typography">
                     <h1>Game over</h1>
                     <p>The winner is</p>
                     <p className="winner">{mainSnap.winner}</p>
                     <p className="thanks">Thank you for playing</p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   </EndScreenWrapper>
};

export default EndScreen;
