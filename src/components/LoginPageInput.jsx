import React from 'react';
import { Input } from "@/components/ui/input"; // Supondo que você use ShadCN UI

// O componente recebe todas as props, incluindo 'label', 'value', e 'onChange'
export default function LoginPageInput({ label, type, placeholder, value, onChange, required }) {
    return (
        <div className="flex flex-col items-start w-full mb-4">
            <label className="text-sm font-bold mb-1 font-titillium">{label}</label>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}         // <-- A 'value' do estado do LoginPage é passada aqui
                onChange={onChange}   // <-- A função 'setUsername/setPassword' é passada aqui
                required={required}
                className="w-full"    // Adicione classes de estilização conforme necessário
            />
        </div>
    );
}