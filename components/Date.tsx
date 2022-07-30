import { format, parseISO } from "date-fns";
import { Badge } from "@chakra-ui/react";

const Date: React.FunctionComponent<{ dateString: string }> = ({
  dateString,
}) => {
  const date = parseISO(dateString);
  const formatted = format(date, "LLLL d, yyyy");
  return (
    <Badge variant="outline">
      <time dateTime={dateString}>{formatted}</time>
    </Badge>
  );
};

export default Date;
