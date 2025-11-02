"use client";

import { useState } from "react";

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
