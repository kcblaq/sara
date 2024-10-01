import { ColumnDef } from "@tanstack/react-table";
import { ExploreContentTableItemType } from "../data/exploreContentTableData";
import Button from "../../components/ui/Button";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const ExploreContentTableColumns: ColumnDef<ExploreContentTableItemType>[] =
  [
    {
      accessorKey: "info",
      header: () => (
        <Button variant="" className="inline-flex gap-1">
          Page title, snippet, & info <AiOutlineQuestionCircle />
        </Button>
      ),
    },
    {
      accessorKey: "dr",
      header: "DR",
    },
    {
      accessorKey: "ur",
      header: "UR",
    },
    {
      accessorKey: "bss",
      header: "BSS",
    },
    {
      accessorKey: "page_type",
      header: "Page type",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "cqs",
      header: "CQS",
    },
    {
      accessorKey: "content_type",
      header: "Content type",
    },
    {
      accessorKey: "sentiment",
      header: "Sentiment",
    },
  ];
