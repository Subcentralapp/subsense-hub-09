import { MessageSquare, Music, Play, Book, Heart, Globe, Zap, Gamepad, Video, BookOpen, Smile, Headphones, Shield } from "lucide-react";

export const getAppIcon = (category: string | null, name: string) => {
  const categoryLower = category?.toLowerCase() || '';
  
  switch (categoryLower) {
    case "streaming vidéo":
      return <Video className="h-6 w-6 text-purple-500" />;
    case "streaming musical":
      return <Headphones className="h-6 w-6 text-green-500" />;
    case "gaming":
      return <Gamepad className="h-6 w-6 text-red-500" />;
    case "productivité":
      return <Zap className="h-6 w-6 text-blue-500" />;
    case "éducation":
      return <BookOpen className="h-6 w-6 text-yellow-500" />;
    case "bien-être":
      return <Smile className="h-6 w-6 text-pink-500" />;
    case "vpn & sécurité":
      return <Shield className="h-6 w-6 text-indigo-500" />;
    case "design":
      return <Zap className="h-6 w-6 text-[#1a237e]" />;
    default:
      return <Globe className="h-6 w-6 text-[#1a237e]" />;
  }
};