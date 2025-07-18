interface Props {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export const MenuOpenIcon = ({
  width = 24,
  height = 24,
  color = "#000",
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
      <path d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m17.3 7.88L17.42 12l2.88-2.88c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0L15.3 11.3c-.39.39-.39 1.02 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42"></path>
    </svg>
  );
};
