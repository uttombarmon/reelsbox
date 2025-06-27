import { Flame, Forward, Laugh, MessageCircle, Zap } from "lucide-react";

const reactions = [
  { icon: <Flame />, label: "Fire" },
  { icon: <Laugh />, label: "Funny" },
  { icon: <Zap />, label: "Shocked" },
  { icon: <MessageCircle />, label: "Comment" },
  { icon: <Forward />, label: "Share" },
];

export const Buttons = () => {
  return (
    <div className="absolute right-4 bottom-10 flex flex-col gap-4 items-center text-white">
      {reactions.map((r, i) => (
        <button
          key={i}
          className="scale-125 transition-transform font-extrabold p-2 bg-slate-400/20 rounded-full"
        >
          {r.icon}
        </button>
      ))}
    </div>
  );
};
