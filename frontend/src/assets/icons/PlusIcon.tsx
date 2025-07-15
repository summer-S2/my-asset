interface Props {
  width?: string | number;
  height?: string | number;
  color?: string;
}

export const PlusIcon = ({
  width = 16,
  height = 16,
  color = "#fff",
}: Props) => {
  return (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      width={width}
      height={height}
      fill={color}
      aria-hidden="true"
    >
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
      <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
    </svg>
  );
};
