import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding database...');

  // Limpiar datos existentes
  await prisma.user.deleteMany();

  // Crear usuarios de ejemplo
  const adminPassword = await bcryptjs.hash('admin123', 10);
  const managerPassword = await bcryptjs.hash('manager123', 10);
  const employeePassword = await bcryptjs.hash('employee123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@multihub.local',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@multihub.local',
      name: 'Gerente',
      password: managerPassword,
      role: 'MANAGER',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@multihub.local',
      name: 'Empleado',
      password: employeePassword,
      role: 'EMPLOYEE',
    },
  });

  console.log('✓ Seeding completed');
  console.log({ admin, manager, employee });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
