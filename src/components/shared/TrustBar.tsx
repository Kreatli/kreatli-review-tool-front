import { Icon, IconType } from '../various/Icon';

const TRUST_ITEMS: { icon: IconType; text: string }[] = [
  { icon: 'shield', text: 'Enterprise-grade encryption' },
  { icon: 'checkCircle', text: '7-day free trial on all plans' },
  { icon: 'group', text: 'Built for creative teams' },
  { icon: 'monitorPlay', text: 'Frame-accurate video review' },
];

export function TrustBar() {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6">
      {TRUST_ITEMS.map((item) => (
        <div key={item.text} className="flex items-center gap-2 text-sm text-foreground-400">
          <Icon icon={item.icon} size={16} className="text-primary/70" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
