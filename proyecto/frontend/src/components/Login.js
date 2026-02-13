import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    // ==================
    // State
    // ==================
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [touched, setTouched] = useState({});
    // ==================
    // Validations
    // ==================
    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value)
                    return 'Email es requerido';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return 'Email inválido';
                return '';
            case 'password':
                if (!value)
                    return 'Contraseña es requerida';
                if (value.length < 6)
                    return 'Contraseña debe tener al menos 6 caracteres';
                return '';
            default:
                return '';
        }
    };
    const validateForm = () => {
        const newErrors = {};
        newErrors.email = validateField('email', formData.email);
        newErrors.password = validateField('password', formData.password);
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };
    // ==================
    // Handlers
    // ==================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Validar en tiempo real si el campo ya fue tocado
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');
        if (!validateForm()) {
            return;
        }
        try {
            await login(formData);
            // Si login es exitoso, navegar a dashboard
            navigate('/dashboard');
        }
        catch (error) {
            setGeneralError(error.message || 'Error al iniciar sesión');
        }
    };
    // ==================
    // Render
    // ==================
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "w-full max-w-md space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-bold tracking-tight text-gray-900", children: "Sistema de Gesti\u00F3n" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "N\u00F3minas y Turnos - MultiHub" })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [generalError && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsxs("div", { className: "flex", children: [_jsx("svg", { className: "h-5 w-5 text-red-400", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z", clipRule: "evenodd" }) }), _jsx("div", { className: "ml-3", children: _jsx("h3", { className: "text-sm font-medium text-red-800", children: generalError }) })] }) })), _jsxs("div", { className: "-space-y-px rounded-md shadow-sm", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "sr-only", children: "Email" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", value: formData.email, onChange: handleChange, onBlur: handleBlur, className: `relative block w-full appearance-none rounded-none rounded-t-md border ${touched.email && errors.email ? 'border-red-300' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`, placeholder: "Email" }), touched.email && errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "sr-only", children: "Contrase\u00F1a" }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", value: formData.password, onChange: handleChange, onBlur: handleBlur, className: `relative block w-full appearance-none rounded-none rounded-b-md border ${touched.password && errors.password ? 'border-red-300' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`, placeholder: "Contrase\u00F1a" }), touched.password && errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password }))] })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), _jsx("span", { className: "ml-2", children: "Iniciando sesi\u00F3n..." })] })) : ('Iniciar Sesión') }), _jsx("div", { className: "rounded-md bg-blue-50 p-4", children: _jsxs("div", { className: "flex", children: [_jsx("svg", { className: "h-5 w-5 text-blue-400", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }), _jsx("div", { className: "ml-3", children: _jsxs("p", { className: "text-sm text-blue-700", children: [_jsx("strong", { children: "Credenciales de prueba:" }), _jsx("br", {}), "Admin: admin@multihub.local / admin123", _jsx("br", {}), "Manager: manager@multihub.local / manager123", _jsx("br", {}), "Employee: employee1@multihub.local / employee123"] }) })] }) })] })] }) }));
};
export default Login;
//# sourceMappingURL=Login.js.map