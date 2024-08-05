import { ChangeEvent } from "react";

type InputProps = {
    type?: 'text' | 'password';
    value: string | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) =>  void;
    placeholder?: string | undefined;
    disabled?: boolean;
    errorMessage?: string | undefined;
}

export const InputField = ({ type, value, onChange, placeholder, disabled, errorMessage }: InputProps) => {
    return (
        <div className="w-full my-3">
            <input 
                type={type || 'text'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full block text-lg p-3 outline-none rounded bg-gray-900 
                    text-white border-slate-400 border-2 focus:border-white
                    ${errorMessage?'border-red-600':'border-gray-900'}`}
            />
            {errorMessage && <div className="text-right text-sm text-red-600">{errorMessage}</div>}
        </div>
    );
}