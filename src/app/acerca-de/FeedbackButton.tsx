"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const FeedbackButton = () => {
  const handleClick = () => {
    window.open('https://github.com/codeplaygroundspace/feriasdemontevideo', '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2 mx-auto"
    >
      <MessageSquare className="h-4 w-4" />
      Envíanos tu feedback
    </Button>
  );
};

export default FeedbackButton;
