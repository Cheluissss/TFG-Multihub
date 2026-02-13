import React from 'react';
interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}
/**
 * ProtectedRoute - Componente que protege rutas que requieren autenticación
 * Opcionalmente puede requerir roles específicos
 */
declare const ProtectedRoute: React.FC<ProtectedRouteProps>;
export default ProtectedRoute;
//# sourceMappingURL=ProtectedRoute.d.ts.map