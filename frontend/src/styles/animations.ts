export const keyframes = {
  wiggle: {
    "0%, 100%": { transform: "rotate(-3deg)" },
    "50%": { transform: "rotate(3deg)" },
  },
  fade: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.1" },
  },
  flipBounce: {
    "0%, 100%": {
      transform: "translateY(0) rotateX(0deg)",
    },
    "25%": {
      transform: "translateY(-10%) rotateX(0deg)",
    },
    "50%": {
      transform: "translateY(-20%) rotateX(360deg)",
    },
    "75%": {
      transform: "translateY(-10%) rotateX(0deg)",
    },
  },
};

export const animations = {
  WIGGLE: "wiggle 1s ease-in-out infinite",
  FADE: "fade 1.5s infinite",
  flipBounce: "flipBounce 1.5s ease-in-out infinite",
};
