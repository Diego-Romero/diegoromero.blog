import { format, parseISO } from "date-fns";

const Date: React.FunctionComponent<{ dateString: string }> = ({
  dateString,
}) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default Date;
