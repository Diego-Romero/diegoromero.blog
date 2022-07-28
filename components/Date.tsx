import { format, parseISO } from "date-fns";
import { Text } from "@chakra-ui/react";

const Date: React.FunctionComponent<{ dateString: string }> = ({
  dateString,
}) => {
  const date = parseISO(dateString);
  const formatted = format(date, "LLLL d, yyyy");
  return (
    <Text fontSize="lg" mt="4" color="GrayText">
      <time dateTime={dateString}>{formatted}</time>
    </Text>
  );
};

export default Date;
