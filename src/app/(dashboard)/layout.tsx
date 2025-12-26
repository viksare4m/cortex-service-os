
import { Shell } from "@/components/layout/shell";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Shell>
            {children}
        </Shell>
    );
}
