import React, { useState } from 'react';
import { toMp3 } from 'youtube-dl-exec';
import ffmpeg from 'ffmpeg-static';

const Converter: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [mp3Url, setMp3Url] = useState<string | null>(null);

  const convert = async () => {
    try {
      const output = await toMp3(url, {
        ffmpegPath: ffmpeg.path,
      });
      setMp3Url(URL.createObjectURL(new Blob([output], { type: 'audio/mp3' })));
    } catch (error) {
      console.error('Error converting to MP3:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={convert}>Convert to MP3</button>
      {mp3Url && <a href={mp3Url} download>Download MP3</a>}
    </div>
  );
};

export default Converter;
