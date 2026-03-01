interface Props {
  width?: number | string;
  height?: number | string;
}

export const Spacer = ({ width, height }: Props) => {
  const hasFixedSize = width !== undefined || height !== undefined;

  return <div style={hasFixedSize ? { width, height } : { flex: 1 }} />;
};
