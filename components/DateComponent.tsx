import { format, parseISO } from "date-fns";
import { Badge, Tag } from "@chakra-ui/react";

interface Props {
  dateString: string;
}

export const SimpleDate: React.FunctionComponent<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  const formatted = format(date, "LLLL d, yyyy");
  return <time dateTime={dateString}>{formatted}</time>;
};

export const DateComponent: React.FunctionComponent<{ dateString: string }> = ({
  dateString,
}) => {
  const date = parseISO(dateString);
  const formatted = format(date, "LLLL d, yyyy");
  return (
    <Tag variant="outline">
      <time dateTime={dateString}>{formatted}</time>
    </Tag>
  );
};
