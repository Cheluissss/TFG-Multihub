import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // Limpiar datos existentes
  await prisma.shiftRequest.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.user.deleteMany();
  await prisma.sede.deleteMany();

  // Crear contraseñas hasheadas
  const adminPassword = await bcryptjs.hash('admin123', 10);
  const managerPassword = await bcryptjs.hash('manager123', 10);
  const employeePassword = await bcryptjs.hash('employee123', 10);

  // Crear usuarios
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

  const employee1 = await prisma.user.create({
    data: {
      email: 'employee1@multihub.local',
      name: 'Empleado 1',
      password: employeePassword,
      role: 'EMPLOYEE',
    },
  });

  const employee2 = await prisma.user.create({
    data: {
      email: 'employee2@multihub.local',
      name: 'Empleado 2',
      password: employeePassword,
      role: 'EMPLOYEE',
    },
  });

  // Crear sedes
  const sedeMadrid = await prisma.sede.create({
    data: {
      name: 'Madrid Central',
      address: 'Calle Gran Vía, 25',
      city: 'Madrid',
      phone: '+34 91 123 4567',
      managerId: manager.id,
    },
  });

  const sedeBarcelona = await prisma.sede.create({
    data: {
      name: 'Barcelona Metropolitana',
      address: 'Passeig de Gràcia, 50',
      city: 'Barcelona',
      phone: '+34 93 987 6543',
    },
  });

  // Asignar empleados a sedes
  await prisma.user.update({
    where: { id: employee1.id },
    data: { sedeId: sedeMadrid.id },
  });

  await prisma.user.update({
    where: { id: employee2.id },
    data: { sedeId: sedeBarcelona.id },
  });

  // Crear turnos de ejemplo
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const shift1 = await prisma.shift.create({
    data: {
      type: 'MORNING',
      date: tomorrow,
      startTime: new Date(tomorrow.setHours(6, 0, 0)),
      endTime: new Date(tomorrow.setHours(14, 0, 0)),
      employeeId: employee1.id,
      sedeId: sedeMadrid.id,
      confirmed: true,
    },
  });

  const shift2 = await prisma.shift.create({
    data: {
      type: 'AFTERNOON',
      date: tomorrow,
      startTime: new Date(tomorrow.setHours(14, 0, 0)),
      endTime: new Date(tomorrow.setHours(22, 0, 0)),
      employeeId: employee2.id,
      sedeId: sedeBarcelona.id,
      confirmed: false,
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('\n📋 Datos creados:');
  console.log('  Admin:', admin.email);
  console.log('  Manager:', manager.email);
  console.log('  Employees:', employee1.email, employee2.email);
  console.log('  Sedes:', sedeMadrid.name, sedeBarcelona.name);
  console.log('  Shifts:', shift1.id, shift2.id);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
