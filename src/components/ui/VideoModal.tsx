import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const videoUrl = "https://upxsbhsamorhvnfebvor.supabase.co/storage/v1/object/public/demo-videos/ai-freelancing-demo.mp4";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Watch: How to Start AI Freelancing for $1</DialogTitle>
        </DialogHeader>
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            className="w-full h-full"
            controls
            poster="/placeholder.svg"
            onError={(e) => {
              // Show placeholder if video doesn't exist yet
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
              const container = target.parentElement;
              if (container) {
                container.innerHTML = `
                  <div class="flex items-center justify-center h-full text-center">
                    <div>
                      <div class="w-16 h-16 text-white mb-4 mx-auto flex items-center justify-center">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p class="text-white text-lg">Demo Video Coming Soon</p>
                      <p class="text-gray-400 text-sm">Upload your video to: Storage → demo-videos bucket</p>
                    </div>
                  </div>
                `;
              }
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;