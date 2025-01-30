import { Company, Event } from "@/prisma/generated/client"

export type CompanyChartProps = {
    companies: Company[],
    events: Event[]
}