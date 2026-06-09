import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

interface CategoryColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#CBEF43",
  "#60A5FA",
  "#F87171",
  "#FB923C",
  "#A78BFA",
  "#34D399",
  "#F472B6",
  "#FACC15",
];

const CategoryColorPicker = ({ value, onChange }: CategoryColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(value);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange(color);
  };

  const handleNativeColorPickerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleColorChange(event.target.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {predefinedColors.map((color) => (
        <div
          key={color}
          className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border border-gray-300"
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        >
          {selectedColor === color && <Check size={20} color="white" />}
        </div>
      ))}

      <div className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border border-gray-300 relative bg-primary">
        <Input
          type="color"
          className="absolute inset-0 opacity-0 cursor-pointer"
          required
          value={selectedColor}
          onChange={handleNativeColorPickerChange}
        />
        <Pencil size={16} color="white" />
      </div>
    </div>
  );
};

export default CategoryColorPicker;
