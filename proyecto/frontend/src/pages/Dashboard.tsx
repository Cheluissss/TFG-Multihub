import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Bienvenido, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* User Info Card */}
          <div className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Información del Usuario
              </h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    {user?.email}
                  </dd>
                </div>

                <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Rol</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        user?.role === 'ADMIN'
                          ? 'bg-red-100 text-red-800'
                          : user?.role === 'MANAGER'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user?.role}
                    </span>
                  </dd>
                </div>

                {user?.sedeId && (
                  <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">ID Sede</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      {user.sedeId}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <div className="flex">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-900">Próximas Funcionalidades</h3>
                <p className="mt-2 text-sm text-blue-700">
                  En los próximos sprints se añadirán: Gestión de usuarios, Gestión de sedes,
                  Gestión de turnos, Calendario, Permutas de turnos, Inventario y Nóminas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
