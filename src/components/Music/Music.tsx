import { type FC, useState } from 'react'

import { Volume2, VolumeOff } from 'lucide-react'
import useSound from 'use-sound'

import { Button } from '../ui/button'
import { MusicWrapper } from './Music.styled'

interface MusicProps {}

const Music: FC<MusicProps> = () => {
  const [musicPlay, setMusicPlay] = useState(false)
  const [play, { pause }] = useSound('/audio/background.mp3')

  return (
    <MusicWrapper>
      {musicPlay ? (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            console.log(musicPlay, 'musicPlay')
            setMusicPlay(false)
            pause()
          }}
        >
          <VolumeOff />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            console.log(musicPlay, 'musicPlay2')
            setMusicPlay(true)
            play()
          }}
        >
          <Volume2 />
        </Button>
      )}
    </MusicWrapper>
  )
}

export default Music
