import React from 'react';
import { Shield, Lock, RefreshCw } from 'lucide-react';

const TrustBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4 text-green-400" />
        <span>Secure checkout</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="w-4 h-4 text-green-400" />
        <span>Cancel anytime</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="w-4 h-4 text-green-400" />
        <span>No hidden fees</span>
      </div>
    </div>
  );
};

export default TrustBadges;