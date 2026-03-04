interface Props {
  title: string;
}

export const Title = ({ title }: Props) => (
  <p className="pl-2 font-semibold border-l-4 text border-primary">{title}</p>
);
