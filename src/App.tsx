import React, { useState, useRef } from "react";
import "./styles.css";

type Track = {
  title: string;
  src: string;
  subtitles: string;
};

const tracks: Track[] = [
  {
    title: "Ән 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    subtitles: "Ән 1 мәтіні",
  },
  {
    title: "Ән 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    subtitles: "Ән 2 мәтіні",
  },
];

const MediaPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const handleTrackChange = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };

  return (
    <div className="player-container">
      <h2>Медиа ойнатқыш</h2>
      <audio ref={audioRef} src={currentTrack.src}></audio>

      {/* Басқару батырмалары */}
      <div className="controls">
        <button onClick={togglePlay}>{isPlaying ? "Тоқтату" : "Ойнату"}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <select value={playbackRate} onChange={handleSpeedChange}>
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* Қазіргі ойналып жатқан ән */}
      <h3>Қазір ойнатылуда: {currentTrack.title}</h3>
      <p>{currentTrack.subtitles}</p>

      {/* Плейлист */}
      <ul className="playlist">
        {tracks.map((track, index) => (
          <li
            key={index}
            onClick={() => handleTrackChange(track)}
            className={currentTrack.title === track.title ? "active" : ""}
          >
            {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaPlayer;
