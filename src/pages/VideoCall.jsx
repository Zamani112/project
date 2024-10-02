import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, PhoneOffIcon } from 'lucide-react';

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Initialize WebRTC peer connection
        peerConnection.current = new RTCPeerConnection();

        stream.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Here you would typically set up signaling to exchange ICE candidates and session descriptions
        // This is a simplified example and doesn't include the full WebRTC signaling process
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeCall();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0];
    audioTrack.enabled = !isMuted;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0];
    videoTrack.enabled = !isVideoOn;
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    // Here you would typically implement navigation back to the dashboard or previous page
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className="col-span-2">
            <CardContent className="p-0">
              <video ref={remoteVideoRef} className="w-full h-96 bg-black rounded-lg" autoPlay playsInline />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <video ref={localVideoRef} className="w-full h-48 bg-gray-800 rounded-lg" autoPlay playsInline muted />
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center space-x-4 bg-white p-4 rounded-lg shadow">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            onClick={toggleMute}
          >
            {isMuted ? <MicOffIcon className="h-4 w-4" /> : <MicIcon className="h-4 w-4" />}
          </Button>
          <Button
            variant={isVideoOn ? "outline" : "destructive"}
            size="icon"
            onClick={toggleVideo}
          >
            {isVideoOn ? <VideoIcon className="h-4 w-4" /> : <VideoOffIcon className="h-4 w-4" />}
          </Button>
          <Button variant="destructive" size="icon" onClick={endCall}>
            <PhoneOffIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;