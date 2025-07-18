interface Props {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export const AccountIcon = ({
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
      <path d="M10 16V8c0-1.1.89-2 2-2h9V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-1h-9c-1.11 0-2-.9-2-2m3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
    </svg>
  );
};
