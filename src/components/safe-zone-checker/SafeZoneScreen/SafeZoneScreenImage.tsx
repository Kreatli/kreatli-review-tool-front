interface Props {
  src: string;
}

export const SafeZoneScreenImage = ({ src }: Props) => {
  return <img src={src} alt="File Preview" className="w-full h-full object-contain bg-black" />;
};
