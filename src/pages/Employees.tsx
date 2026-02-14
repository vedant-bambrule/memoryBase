import { useEffect, useState } from 'react';
import { EmployeeTable } from '../components/employees/EmployeeTable';
import { getEmployees } from '../services/mockService';
import { type Employee } from '../types';

export function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Failed to load employees', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Team member directory and information.
                </p>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                </div>
            ) : (
                <EmployeeTable employees={employees} />
            )}
        </div>
    );
}
