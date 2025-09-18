import { Switch } from '@/components/ui/switch';

export function SwitchDemo({ checked, onCheckedChange }) {
  return (
    <div className="flex items-center space-x-2">
      <h1>Highlights</h1>
      <Switch
        id="airplane-mode"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
