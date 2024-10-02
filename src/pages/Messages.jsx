import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendIcon, UserIcon, PhoneIcon, VideoIcon, MicIcon, PaperclipIcon } from 'lucide-react';
import { fetchMessages, sendMessage } from '../api/messages';
import { useAuth } from '../hooks/useAuth';
import io from 'socket.io-client';

const Messages = () => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef(null);
  const queryClient = useQueryClient();
  const socketRef = useRef();
  const navigate = useNavigate();

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages', user?.id],
    queryFn: () => fetchMessages(user?.id),
    enabled: !!user,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.setQueryData(['messages', user?.id], (oldData) => [...(oldData || []), data]);
      setNewMessage('');
    },
  });

  useEffect(() => {
    if (user) {
      socketRef.current = io('http://localhost:5000');
      socketRef.current.on('newMessage', (message) => {
        queryClient.setQueryData(['messages', user.id], (oldData) => [...(oldData || []), message]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [queryClient, user]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      sendMessageMutation.mutate({ userId: user.id, content: newMessage });
    }
  };

  const handleVideoCall = () => {
    navigate('/video-call');
  };

  if (!user) {
    return <div>Please sign in to view messages.</div>;
  }

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div>Error loading messages: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
            {messages && messages.length > 0 ? messages.map((message) => (
              <div key={message.id} className={`mb-2 ${message.senderId === user.id ? 'text-right' : ''}`}>
                <div className="flex items-start space-x-2">
                  {message.senderId !== user.id && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback><UserIcon className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`inline-block p-2 rounded-lg ${
                    message.senderId === user.id 
                      ? 'bg-orange-100 text-orange-900' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-gray-500">No messages yet.</div>
            )}
          </ScrollArea>
          <div className="p-4 bg-background border-t flex items-center">
            <div className="flex space-x-2 mr-2">
              <Button variant="ghost" size="icon">
                <MicIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleVideoCall}>
                <VideoIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <PhoneIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
            </div>
            <Input
              className="flex-grow mr-2"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;