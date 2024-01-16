import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ statusStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: statusStats?.Pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      backgroundColor: "#fef3c7",
    },
    {
      title: "Interviews scheduled",
      count: statusStats?.Interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      backgroundColor: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: statusStats?.Declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      backgroundColor: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
