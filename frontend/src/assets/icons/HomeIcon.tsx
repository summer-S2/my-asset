interface Props {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export const HomeIcon = ({
  width = 20,
  height = 20,
  color = "#9eb9f5",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"></path>
    </svg>
  );
};
