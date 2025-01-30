import { Company, Event } from "@prisma/client"


export type CompanyChartProps = {
    companies: Company[],
    events: Event[]
}