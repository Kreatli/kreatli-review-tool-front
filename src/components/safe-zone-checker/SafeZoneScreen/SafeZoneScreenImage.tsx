interface Props {
  src: string;
}

export const SafeZoneScreenImage = ({ src }: Props) => {
  return (
    <img
      src={src}
      alt="Social media safe zone preview with overlay indicators"
      className="h-full w-full bg-black object-contain"
    />
  );
};
