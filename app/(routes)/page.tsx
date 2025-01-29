import CardSummary from "./components/CardSummary/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import LastCustomers from "./components/LastCustomers/LastCustomers";
import SalesDistributor from "./components/SalesDistributor/SalesDistributor";
import TotalSuscribers from "./components/TotalSuscribers/TotalSuscrbers";
import ListIntegrations from "./components/ListIntegrations/ListIntegrations";

const dataCardSummary = [
  {
    icon: UsersRound,
    total: "12.450",
    avarage: 12.45,
    title: "Compañias Creadas",
    tooltip: "See all the companies created",
  },
  {
    icon: Waypoints,
    total: "86.5%",
    avarage: 80,
    title: "Total Revenue",
    tooltip: "See all of the Summary",
  },
  {
    icon: BookOpenCheck,
    total: "Q505,62",
    avarage: 30,
    title: "Bounce Rate",
    tooltip: "See all of the Bounce Rate",
  },
];

export default function PrincipalPage() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Panel de Control</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
        {dataCardSummary.map(({ icon, total, avarage, title, tooltip }) => (
          <CardSummary
            key={title}
            icon={icon}
            total={total}
            avarage={avarage}
            title={title}
            tooltip={tooltip}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12">
        <LastCustomers />
        <SalesDistributor />
      </div>
      <div className="flex-col xl:flex xl:flex-row gap-y-4 md:gap-x-10 md:gap-y-0 mt-12 md:mb-10 justify-center">
        <TotalSuscribers />
        <ListIntegrations />
      </div>
    </div>
  );
}
