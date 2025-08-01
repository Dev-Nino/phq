import { useWidget } from '../../contexts/WidgetContext/WidgetProvider';

interface TabLauncherProps {
  onClick: () => void;
}

export const TabLauncher = ({ onClick }: TabLauncherProps) => {
  const {
    state: { config },
  } = useWidget();

  const isLeft = config.launcherPosition === 'Left';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return !config || !onClick ? null : (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ [isLeft ? 'left' : 'right']: 0 }}
    >
      <div className="relative">
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium shadow-lg ${
            isLeft ? 'rounded-r-lg' : 'rounded-l-lg translate-x-1'
          }`}
          style={{
            backgroundColor: config.backgroundColor || '#ff6334',
            color: config.iconColor === 'Dark' ? '#1F2937' : '#FFFFFF',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-lr',
              textOrientation: 'mixed',
              transform: isLeft ? 'none' : 'rotate(180deg)',
            }}
          >
            {config.launcherText || "What's new"}
          </span>
        </button>
        {config.notificationCount && config.notificationCount > 0 && (
          <>
            {config.notificationType === 'Count' && (
              <span
                className={`absolute -top-2 ${isLeft ? '-right-2' : '-left-2'} px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full`}
              >
                {config.notificationCount}
              </span>
            )}
            {config.notificationType === 'Dot' && (
              <span
                className={`absolute -top-2 ${isLeft ? '-right-2' : '-left-2'} min-w-[20px] min-h-[20px] bg-red-500 rounded-full`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
