'use client'
import { useState } from 'react';
import ytdl from 'ytdl-core';

const Downloader = () => {
  const [videoURL, setVideoURL] = useState('');
  const [downloadURL, setDownloadURL] = useState('');

  const handleDownload = async () => {
    try {
      const info = await ytdl.getInfo(videoURL);
      const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      if (format) {
        setDownloadURL(format.url);
      } else {
        alert('No audio format found');
      }
    } catch (error) {
      console.error('Error downloading video:', error);
      alert('Error downloading video');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl mb-4">YouTube MP3 Downloader</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="border p-2 flex-grow mr-2"
        />
        <button onClick={handleDownload} className="bg-blue-500 text-white p-2 rounded">
          Download
        </button>
      </div>
      {downloadURL && (
        <div className="mb-4">
          <a href={downloadURL} download className="bg-green-500 text-white p-2 rounded">
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
};

export default Downloader;
