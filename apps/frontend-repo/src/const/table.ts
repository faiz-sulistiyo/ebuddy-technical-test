import { Column } from "@/components/shared/DataTable";
import { User } from "@ebuddy/types";

export const userColumns: Column<User & { actions?: string }>[] = [
    {
      id: "name",
      label: "Name",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      align: "left",
    },
    {
      id: "totalAverageWeightRatings",
      label: "Total Average Weight Ratings",
      align: "left",
    },
    {
      id: "numberOfRents",
      label: "Number of Rents",
      align: "left",
    },
    {
      id: "recentlyActive",
      label: "Recently Active",
      align: "left",
      type: "date",
    },
    {
      id: "actions",
      label: "Actions",
      align: "left",
      type: "action",
    }
  ]