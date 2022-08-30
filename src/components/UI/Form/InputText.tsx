/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
import classNames from 'classnames';

import { ITextInput } from '@/types/types-main';

function InputText({ type, name, label, placeholder, maxLength, onChange, value, touched, errors }: ITextInput) {
  const classText = classNames(
    'block w-full rounded-lg border p-2.5 text-sm text-gray-900 focus:border-blue-400 focus:ring-blue-500',
    {
      'border-gray-300 bg-gray-50': !touched && !errors,
      'border-red-500 bg-red-50': touched && errors,
    },
  );
  return (
    <div className="mb-3">
      <label htmlFor={`floating_input_${name}`} className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={`text_input_${name}`}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        className={classText}
        pattern={type === 'number' ? '[0-9]*' : undefined}
        placeholder={placeholder}
        onKeyPress={
          type === 'number'
            ? (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }
            : undefined
        }
        onInput={
          type === 'number'
            ? (event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target;
                if (value.length > event.target.maxLength) {
                  event.target.value = value.slice(0, event.target.maxLength);
                }
              }
            : undefined
        }
      />
      {touched && errors ? <span className="text-xs text-red-500">{errors}</span> : null}
    </div>
  );
}

InputText.defaultProps = {
  type: 'text',
  value: '',
  placeholder: 'Ketikan Inputan',
  maxLength: undefined,
  onChange: () => {},
};

export default InputText;
