import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: LucideIcon;
    iconColor: string;
    iconBgColor: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor, iconBgColor }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
                </div>
                <div className={`${iconBgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
}
