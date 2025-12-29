interface Props {
  src: string;
}

export const SafeZoneScreenImage = ({ src }: Props) => {
  return <img src={src} alt="File Preview" className="h-full w-full bg-black object-contain" />;
};
