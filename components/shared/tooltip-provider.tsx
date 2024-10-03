import * as Tooltip from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface TooltipProviderProps {
  title: string;
  children: ReactNode;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ title, children }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="py-1 px-2 bg-gray-700 text-white text-sm  rounded-md shadow-md">
            {title}
            <Tooltip.Arrow className="fill-gray-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipProvider;
