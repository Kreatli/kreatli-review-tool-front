import { StatusColorDot } from './StatusColorDot';

export const STATUS_COLORS = ['#016fee', '#7828c8', '#1ac964', '#f31260', '#ff4ecd', '#f6a624', '#7ee7fc'];

interface Props {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const StatusColorPicker = ({ selectedColor, onColorSelect }: Props) => {
  return (
    <div className="flex items-center gap-4">
      {STATUS_COLORS.map((color) => (
        <StatusColorDot
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};
