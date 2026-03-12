import { type Employee } from '../../types';

interface EmployeeTableProps {
    employees: Employee[];
}

const gradients = [
    'from-indigo-500 to-violet-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-sky-500',
];

export function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-surface-200">
                    <thead className="bg-surface-50/50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400">
                                Department
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-200 bg-white">
                        {employees.map((employee, index) => (
                            <tr key={employee.id} className="hover:bg-surface-50 transition-colors group">
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white text-sm font-bold shadow-soft group-hover:scale-105 transition-transform duration-200`}>
                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-semibold text-navy-800">{employee.name}</span>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className="text-sm text-navy-600 font-medium">{employee.role}</span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <span className="badge-info">
                                        {employee.department}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
