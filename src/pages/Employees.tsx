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
        <div className="space-y-8">
            <div className="page-header mb-0">
                <h1 className="page-title">Employees</h1>
                <p className="page-subtitle">
                    Team member directory and information
                </p>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-surface-300 border-t-indigo-500" />
                        <p className="text-sm text-navy-400 font-medium">Loading employees...</p>
                    </div>
                </div>
            ) : (
                <EmployeeTable employees={employees} />
            )}
        </div>
    );
}
