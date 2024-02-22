import FilledButton from '@/app/component/FilledButton';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const OtpInput: React.FC = () => {
  const inputRefs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null));
  const [otpValues, setOtpValues] = useState<string[]>(Array(4).fill(''));

  useEffect(() => {
    // Set initial focus on the first input field when the component mounts
    inputRefs[0]?.current?.focus();
  }, []);

  const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    } else if ((e.key === 'ArrowLeft' && index > 0) || (e.key === 'Backspace' && !value)) {
      inputRefs[index - 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    if (e.key !== 'Backspace') {
      newOtpValues[index] = value;
    }
    setOtpValues(newOtpValues);
  };

  return (
    <div className="flex space-x-2 flex-col gap-4 w-full">
      <div className='flex space-x-2 justify-center '>
      {Array.from({ length: 4 }, (_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          value={otpValues[index]}
          className="w-10 h-10 text-center border rounded-md focus:outline-none focus:shadow focus:shadow-purple-700"
        />
      ))}
      </div>
      <FilledButton title='Verify email' handleClick={()=> console.log(otpValues)} />
    </div>
  );
};

export default OtpInput;
