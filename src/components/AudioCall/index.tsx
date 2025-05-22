// AudioCall.js
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import config from "@/config";

const AudioCall = () => {
  const [isCalling, setIsCalling] = useState(false);
  const localAudioRef = useRef<HTMLMediaElement | null>(null);
  const remoteAudioRef = useRef<HTMLMediaElement | null>(null);
  const pc = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );

  const startCall = async () => {
    setIsCalling(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    if (localAudioRef.current) {
      localAudioRef.current.srcObject = stream;
    }

    stream.getTracks().forEach((track) => {
      console.log("track", track);
      console.log("stream", stream);
      pc.current.addTrack(track, stream);
    });

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    const response = await fetch(`${config.apiUrl}/www/character/offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sdp: offer.sdp,
        type: offer.type,
      }),
    });

    const answer = await response.json();
    console.log("answer", answer);
    await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  pc.current.ontrack = (event) => {
    console.log("ontrack", event);
    if (event.track.kind === "audio" && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = event.streams[0];
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Audio Call</h2>
      <Button onClick={startCall} disabled={isCalling}>
        Start Call
      </Button>
      <div>
        <h3 className="text-lg font-bold">Local Audio</h3>
        <audio ref={localAudioRef} autoPlay muted />
      </div>
      <div>
        <h3 className="text-lg font-bold">Remote Audio</h3>
        <audio ref={remoteAudioRef} autoPlay />
      </div>
    </div>
  );
};

export default AudioCall;
