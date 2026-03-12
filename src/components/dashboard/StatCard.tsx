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
        <div className="card hover-lift p-6 group">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-xs font-semibold text-navy-400 uppercase tracking-wide">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-navy-900 tracking-tight">{value}</p>
                    <p className="mt-1.5 text-xs text-navy-400 font-medium">{subtitle}</p>
                </div>
                <div className={`${iconBgColor} p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );
}
