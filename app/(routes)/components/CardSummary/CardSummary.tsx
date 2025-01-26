import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { CardSummaryProps } from "./CardSummary.types";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";

export default function CardSummary(props: CardSummaryProps) {
  const { title, total, avarage, icon: Icon, tooltip } = props;

  return (
    <div className="drop-shadow-md bg-background rounded-lg p-5 hover:shadow-lg transition border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <CustomIcon icon={Icon} />
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
        </div>
        <CustomTooltip content={tooltip} />
      </div>
      <div className="flex gap-4 mt-2 md:mt-4">
        <p className="text-2xl">{total}</p>
        <div
          className={cn(
            `flex items-center gap-1 px-2 text-xs text-white rounded-lg h-[20px] bg-black dark:bg-secondary`
          )}
        >
          {avarage}%
          {avarage < 20 && (
            <ArrowDownRight strokeWidth={2} className="w-4 h-4" />
          )}
          {avarage > 20 && avarage < 70 && (
            <ArrowUpRight strokeWidth={2} className="w-4 h-4" />
          )}
          {avarage > 70 && <TrendingUp strokeWidth={2} className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}
