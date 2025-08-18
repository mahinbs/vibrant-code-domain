import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Watch: How to Start AI Freelancing for $1</DialogTitle>
        </DialogHeader>
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-white mb-4 mx-auto" />
            <p className="text-white text-lg">Demo Video Coming Soon</p>
            <p className="text-gray-400 text-sm">See exactly how you'll start freelancing in AI</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;