import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
/**
 * ProtectedRoute - Componente que protege rutas que requieren autenticación
 * Opcionalmente puede requerir roles específicos
 */
const ProtectedRoute = ({ children, requiredRoles }) => {
    const { user, isAuthenticated } = useAuth();
    // Si no está autenticado, redirigir a login
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // Si requiere roles específicos, validar
    if (requiredRoles && user && !requiredRoles.includes(user.role)) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "403" }), _jsx("p", { className: "mt-2 text-lg text-gray-600", children: "No tienes permiso para acceder a esta p\u00E1gina" })] }) }));
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.js.map