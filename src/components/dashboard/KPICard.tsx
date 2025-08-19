import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease";
  };
  icon?: ReactNode;
  className?: string;
}

export function KPICard({ title, value, change, icon, className }: KPICardProps) {
  return (
    <Card className={cn("transition-all duration-fast hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {change.type === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    change.type === "increase" ? "text-success" : "text-destructive"
                  )}
                >
                  {change.value}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-3 bg-primary/10 rounded-full">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}