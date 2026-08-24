'use client'

import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: { label: string; description?: string }[];
  currentStep: number; // 0-indexed
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={index} className="flex-1 relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-[50%] right-[-50%] h-0.5 -translate-y-1/2 z-0 hidden sm:block md:left-[50%] md:right-[-50%] ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                  style={{ width: '100%' }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                    ${isUpcoming ? 'bg-slate-200 text-slate-400' : ''}
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <div className="mt-3 text-center hidden sm:block">
                  <div
                    className={`text-sm ${
                      isCurrent ? 'font-medium text-blue-600' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
