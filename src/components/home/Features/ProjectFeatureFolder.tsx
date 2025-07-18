import { Icon } from '../../various/Icon';

interface Props {
  title: string;
  items: number;
  size: number;
}

export const ProjectFeatureFolder = ({ title, items, size }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="shadow-small aspect-video rounded-md dark:border border-foreground-300 items-center justify-center flex bg-foreground-50">
        <Icon icon="folder" className="text-foreground-400" size={36} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-foreground-500">
          {items} items, {size}GB
        </div>
      </div>
    </div>
  );
};
