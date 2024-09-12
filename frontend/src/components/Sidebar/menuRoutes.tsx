import {
  FaRegCalendarCheck,
  FaRegCalendarMinus,
  FaEnvelopeOpenText,
  FaUserGraduate,
  FaUserMd,
  FaChartBar,
  FaMedal,
  FaSkullCrossbones,
  FaHandshake,
  FaMicroscope,
  FaListUl,
  FaListOl,
  FaBalanceScale,
  FaCity,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaSortAmountUp,
  FaRegTimesCircle,
  FaRegQuestionCircle,
  FaRegThumbsUp,
  FaRegEnvelope,
  FaRegComment,
  FaRegEye,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  HiOutlineUserCircle,
  HiOutlineChat,
  HiOutlineFlag,
} from "react-icons/hi";
import { LuClipboardList, LuHome, LuMapPin } from "react-icons/lu";
import SidebarMenuItem from "./SidebarMenuItem";
import { AiOutlineInfoCircle } from "react-icons/ai";

const sidebarRoutes = [
  // {
  //   link: "invitations",
  //   text: "Invitations (Preview)",
  // },
  {
    link: "/",
    text: "Welcome",
    icon: <SidebarMenuItem Icon={LuHome} />,
  },
  // {
  //   link: "/dashboard",
  //   text: "Dashboard",
  //   icon: <HiOutlineViewGrid className="h-5 w-5" />,
  // },
  {
    link: "/profile",
    text: "My Profile",
    icon: <SidebarMenuItem Icon={HiOutlineUserCircle} />,
    auth: "signedIn",
  },
  {
    link: "/main",
    text: "Main Chat",
    icon: <SidebarMenuItem Icon={HiOutlineChat} />,
  },
  {
    link: "/report",
    text: "Mod Reports",
    icon: <SidebarMenuItem Icon={HiOutlineFlag} />,
  },
  {
    heading: "Interview Info",
    items: [
      {
        link: "/interviewInvite",
        text: "IV Offers",
        icon: <SidebarMenuItem Icon={FaRegCalendarCheck} />,
      },
      {
        link: "/interviewRejection",
        text: "IV Rejections",
        icon: <SidebarMenuItem Icon={FaRegTimesCircle} />,
      },
      {
        link: "/dropped",
        text: "IV Dropped",
        icon: <SidebarMenuItem Icon={FaRegCalendarMinus} />,
      },
      {
        link: "/interviewLogistics",
        text: "IV Logistics",
        icon: <SidebarMenuItem Icon={LuMapPin} />,
      },
      {
        link: "/question",
        text: "IV Questions",
        icon: <SidebarMenuItem Icon={FaRegQuestionCircle} />,
      },
      {
        link: "/interviewImpression",
        text: "IV Impressions",
        icon: <SidebarMenuItem Icon={FaRegThumbsUp} />,
      },
      {
        link: "/lOIResponse",
        text: "LOInterest Response",
        icon: <SidebarMenuItem Icon={FaEnvelopeOpenText} />,
      },
      {
        link: "/lOIntentResponse",
        text: "LOIntent Response",
        icon: <SidebarMenuItem Icon={FaRegEnvelope} />,
      },
      {
        link: "/postIVCommunication",
        text: "Post-IV Communication",
        icon: <SidebarMenuItem Icon={FaRegComment} />,
      },
      {
        link: "/secondLook",
        text: "Second Look",
        icon: <SidebarMenuItem Icon={FaRegEye} />,
      },
    ],
  },
  {
    heading: "Applicant Info",
    items: [
      {
        link: "/applicant-us",
        text: "US Applicant Data",
        icon: <SidebarMenuItem Icon={FaUserGraduate} />,
      },
      {
        link: "/applicant-img",
        text: "IMG Applicant Data",
        icon: <SidebarMenuItem Icon={FaUserMd} />,
      },
      {
        link: "/rank-tally",
        text: "Rank Tally",
        icon: <SidebarMenuItem Icon={FaChartBar} />,
      },
    ],
  },
  {
    heading: "Program Info",
    items: [
      {
        link: "/program",
        text: "Program Overview",
        icon: <SidebarMenuItem Icon={AiOutlineInfoCircle} />, // Represents informational content
      },
      {
        link: "/fameShame",
        text: "Name Fame/Shame",
        icon: <SidebarMenuItem Icon={FaMedal} />,
      },
      {
        link: "/m4InternImpression",
        text: "M4/Intern Impressions",
        icon: <SidebarMenuItem Icon={LuClipboardList} />,
      },
      {
        link: "/malignant",
        text: "Malignant",
        icon: <SidebarMenuItem Icon={FaSkullCrossbones} />,
      },
      {
        link: "/scheduleDetails",
        text: "Program Schedule",
        icon: <SidebarMenuItem Icon={FaRegCalendarAlt} />,
      },
      {
        link: "/fellowshipMatch",
        text: "Fellowship Match",
        icon: <SidebarMenuItem Icon={FaHandshake} />,
      },
      {
        link: "/pstp",
        text: "PSTP",
        icon: <SidebarMenuItem Icon={FaMicroscope} />,
      },
      {
        link: "/tier-list",
        text: "Tier List",
        icon: <SidebarMenuItem Icon={FaListUl} />,
      },
      {
        link: "/tier-list-img",
        text: "Tier List (IMG)",
        icon: <SidebarMenuItem Icon={FaListOl} />,
      },
      // {
      //   link: "/x-or-y",
      //   text: "X vs Y",
      //   icon: <FaBalanceScale className="h-5 w-5" />,
      // },
      // {
      //   link: "/x-or-y-img",
      //   text: "X vs Y (IMG)",
      //   icon: <FaBalanceScaleLeft className="h-5 w-5" />,
      // },
      {
        link: "/xorY",
        text: "X vs Y",
        icon: <SidebarMenuItem Icon={FaBalanceScale} />,
      },
      // {
      //   link: "/x-or-y-img",
      //   text: "X vs Y (IMG)",
      //   icon: <FaBalanceScaleLeft className="h-5 w-5" />,
      // },
      {
        link: "/cityUserInput",
        text: "Cities",
        icon: <SidebarMenuItem Icon={FaCity} />,
      },
    ],
  },
  {
    heading: "Rank Data",
    items: [
      {
        link: "/rank-list-md",
        text: "Rank Lists (MD)",
        icon: <SidebarMenuItem Icon={FaSortNumericDown} />,
      },
      {
        link: "/rank-list-do",
        text: "Rank Lists (DO)",
        icon: <SidebarMenuItem Icon={FaSortNumericDownAlt} />,
      },
      {
        link: "/rank-list-img",
        text: "Rank Lists (IMG)",
        icon: <SidebarMenuItem Icon={FaSortAmountUp} />,
      },
    ],
  },
];

export default sidebarRoutes;
