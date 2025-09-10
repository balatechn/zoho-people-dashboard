import { c as create_ssr_component, v as validate_component, e as escape, h as add_attribute, f as each } from "../../../chunks/ssr.js";
import { H as Header, S as Sidebar, U as Users, D as Download, P as Plus, F as Filter } from "../../../chunks/app.js";
import { U as Upload } from "../../../chunks/upload.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Eye = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "eye" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const More_vertical = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "1" }],
    ["circle", { "cx": "12", "cy": "5", "r": "1" }],
    ["circle", { "cx": "12", "cy": "19", "r": "1" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "more-vertical" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pen_square = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      }
    ],
    [
      "path",
      {
        "d": "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pen-square" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "11", "cy": "11", "r": "8" }],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "search" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "11",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "11",
        "y2": "17"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function getInitials(employee) {
  if (employee.firstName && employee.lastName) {
    return (employee.firstName.charAt(0) + employee.lastName.charAt(0)).toUpperCase();
  }
  return employee.fullName ? employee.fullName.split(" ").map((n) => n.charAt(0)).join("").substring(0, 2).toUpperCase() : "UN";
}
function getAvatarColor(employee) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500"
  ];
  const name = employee.fullName || employee.firstName;
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let departments;
  let employees = [
    {
      employeeNumber: "NCPL019",
      firstName: "Balasubramanian",
      middleName: "",
      lastName: "Pillai",
      fullName: "Balasubramanian Pillai",
      gender: "Male",
      dateOfJoining: "03-03-2025",
      designation: "Manager IT",
      workEmail: "bala@nationalconsultingindia.com",
      department: "IT",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "bpillai100@gmail.com",
      mobileNumber: "91-8484040237",
      dateOfBirth: "28-11-1970",
      profileImage: null
    },
    {
      employeeNumber: "NCPL001",
      firstName: "Mohammed",
      middleName: "",
      lastName: "Farooq",
      fullName: "Mohammed Farooq",
      gender: "Male",
      dateOfJoining: "22-01-2024",
      designation: "EA - Director",
      workEmail: "farooq@nationalconsultingindia.com",
      department: "Management",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "11-04-1985",
      profileImage: null
    },
    {
      employeeNumber: "NCPL017",
      firstName: "Prasanna",
      middleName: "",
      lastName: "Hegde",
      fullName: "Prasanna Hegde",
      gender: "Male",
      dateOfJoining: "10-02-2025",
      designation: "Accounts Executive",
      workEmail: "prasanna.h@nationalconsultingindia.com",
      department: "Accounts",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "prasanna27hegde@gmail.com",
      mobileNumber: "9663783062",
      dateOfBirth: "27-09-1999",
      profileImage: null
    },
    {
      employeeNumber: "NCPL007",
      firstName: "Karthik",
      middleName: "",
      lastName: "M K",
      fullName: "Karthik M K",
      gender: "Male",
      dateOfJoining: "01-08-2024",
      designation: "CFO",
      workEmail: "karthik.mk@nationalconsultingindia.com",
      department: "Accounts",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "06-05-1987",
      profileImage: null
    },
    {
      employeeNumber: "NCPL000",
      firstName: "Shahil",
      middleName: "",
      lastName: "Anoof",
      fullName: "Shahil Anoof",
      gender: "Male",
      dateOfJoining: "08-07-2010",
      designation: "Managing Director",
      workEmail: "shahil@nationalconsultingindia.com",
      department: "Management",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "08-02-1991",
      profileImage: null
    },
    {
      employeeNumber: "NCPL024",
      firstName: "Yahya Ayash",
      middleName: "",
      lastName: "Luqman",
      fullName: "Yahya Ayash Luqman",
      gender: "Male",
      dateOfJoining: "05-05-2025",
      designation: "Software Development Manager",
      workEmail: "yahya@nationalconsultingindia.com",
      department: "Software Development",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "04-02-1997",
      profileImage: null
    },
    {
      employeeNumber: "NCPL002",
      firstName: "Shruthi",
      middleName: "",
      lastName: "Nandeesh",
      fullName: "Shruthi Nandeesh",
      gender: "Female",
      dateOfJoining: "03-03-2024",
      designation: "Asst Manager HR",
      workEmail: "shruthi.d@nationalconsultingindia.com",
      department: "HR",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "shruthid04@gmail.com",
      mobileNumber: "9036093988",
      dateOfBirth: "04-02-1991",
      profileImage: null
    },
    {
      employeeNumber: "NCPL008",
      firstName: "Dipti",
      middleName: "",
      lastName: "Amarnath",
      fullName: "Dipti Amarnath",
      gender: "Female",
      dateOfJoining: "02-09-2024",
      designation: "Senior Manager Social Media Marketing",
      workEmail: "dipti.a@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "diptiamarnath@gmail.com",
      mobileNumber: "9916246404",
      dateOfBirth: "08-04-1994",
      profileImage: null
    },
    {
      employeeNumber: "NCPL012",
      firstName: "Sanjana",
      middleName: "",
      lastName: "Jagadeesha",
      fullName: "Sanjana Jagadeesha",
      gender: "Female",
      dateOfJoining: "08-10-2024",
      designation: "Associate Legal Advisor",
      workEmail: "sanjana.j@nationalconsultingindia.com",
      department: "Legal",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "9481895999",
      dateOfBirth: "12-10-1996",
      profileImage: null
    },
    {
      employeeNumber: "NCPL026",
      firstName: "Shalini",
      middleName: "",
      lastName: "N",
      fullName: "Shalini N",
      gender: "Female",
      dateOfJoining: "12-05-2025",
      designation: "Tele Caller",
      workEmail: "customerconnect@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "shalini145shalu@gmail.com",
      mobileNumber: "6363576184",
      dateOfBirth: "24-12-1999",
      profileImage: null
    },
    {
      employeeNumber: "NCPL014",
      firstName: "Kiran Kumar",
      middleName: "",
      lastName: "Uggina",
      fullName: "Kiran Kumar Uggina",
      gender: "Male",
      dateOfJoining: "01-01-2025",
      designation: "Sr 3D Architectural Visualizer",
      workEmail: "kiran.k@nationalconsultingindia.com",
      department: "Real estate",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "kiranuggina@gmail.com",
      mobileNumber: "9908524129",
      dateOfBirth: "03-06-1995",
      profileImage: null
    },
    {
      employeeNumber: "NCPL018",
      firstName: "Siddharth",
      middleName: "",
      lastName: "Venkat",
      fullName: "Siddharth Venkat",
      gender: "Male",
      dateOfJoining: "17-02-2025",
      designation: "Sr Architect",
      workEmail: "siddharth.v@nationalconsultingindia.com",
      department: "Real estate",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "siddharth2522@gmail.com",
      mobileNumber: "8148516036",
      dateOfBirth: "25-01-1996",
      profileImage: null
    },
    {
      employeeNumber: "NCPL023",
      firstName: "Mamatha",
      middleName: "",
      lastName: "M",
      fullName: "Mamatha M",
      gender: "Female",
      dateOfJoining: "05-05-2025",
      designation: "Graphic Designer",
      workEmail: "mamatha.m@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "mamatha.m1920@gmail.comm",
      mobileNumber: "9148395080",
      dateOfBirth: "07-09-2000",
      profileImage: null
    },
    {
      employeeNumber: "NCPL015",
      firstName: "Manjushri",
      middleName: "",
      lastName: "G",
      fullName: "Manjushri G",
      gender: "Female",
      dateOfJoining: "02-01-2025",
      designation: "Tele Caller",
      workEmail: "montrasupport@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "legendary.shree@gmail.com",
      mobileNumber: "7338527166",
      dateOfBirth: "15-03-1984",
      profileImage: null
    },
    {
      employeeNumber: "NCPL016",
      firstName: "Shwetha",
      middleName: "",
      lastName: "D",
      fullName: "Shwetha D",
      gender: "Female",
      dateOfJoining: "06-02-2025",
      designation: "Tele Caller",
      workEmail: "isuzusupport@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "eeshacutie421@gmail.com",
      mobileNumber: "9148288137",
      dateOfBirth: "23-06-2001",
      profileImage: null
    },
    {
      employeeNumber: "NCPL028",
      firstName: "Adityaa",
      middleName: "",
      lastName: "Nagarajan",
      fullName: "Adityaa Nagarajan",
      gender: "Male",
      dateOfJoining: "09-06-2025",
      designation: "Full Stack Developer",
      workEmail: "aadityaa@nationalconsultingindia.com",
      department: "Software Development",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "aadi2606.business@gmail.com",
      mobileNumber: "9080276386",
      dateOfBirth: "26-06-2003",
      profileImage: null
    },
    {
      employeeNumber: "NCPL027",
      firstName: "Akshay",
      middleName: "",
      lastName: "Hondi",
      fullName: "Akshay Hondi",
      gender: "Male",
      dateOfJoining: "26-05-2025",
      designation: "Social Media Analyst",
      workEmail: "akshay.h@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "akshayhondi4@gmail.com",
      mobileNumber: "8762339217",
      dateOfBirth: "23-05-1998",
      profileImage: null
    },
    {
      employeeNumber: "NCPL010",
      firstName: "Abhiram",
      middleName: "",
      lastName: "C",
      fullName: "Abhiram C",
      gender: "Male",
      dateOfJoining: "21-10-2024",
      designation: "Graphic Designer",
      workEmail: "abhiram.c@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "abhiabhiram453@gmail.com",
      mobileNumber: "",
      dateOfBirth: "03-10-2000",
      profileImage: null
    },
    {
      employeeNumber: "NCPL006",
      firstName: "Ijaz",
      middleName: "",
      lastName: "Ahmed",
      fullName: "Ijaz Ahmed",
      gender: "Male",
      dateOfJoining: "29-07-2024",
      designation: "Assistant Manager - BD",
      workEmail: "ijaz@nationalconsultingindia.com",
      department: "Business Development",
      workLocation: "Head Office",
      employeeStatus: "Exited",
      personalEmail: "ijazahmedhdv@gmail.com",
      mobileNumber: "",
      dateOfBirth: "19-05-1996",
      profileImage: null
    },
    {
      employeeNumber: "NCPL003",
      firstName: "Sheik",
      middleName: "",
      lastName: "Munavar",
      fullName: "Sheik Munavar",
      gender: "Male",
      dateOfJoining: "29-07-2024",
      designation: "Lead Business Development",
      workEmail: "munavar@nationalconsultingindia.com",
      department: "Business Development",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "sheik.munavar@gmail.com",
      mobileNumber: "",
      dateOfBirth: "06-08-1982",
      profileImage: null
    },
    {
      employeeNumber: "NCPL029",
      firstName: "Deepanshi",
      middleName: "",
      lastName: "Mamgain",
      fullName: "Deepanshi Mamgain",
      gender: "Female",
      dateOfJoining: "23-06-2025",
      designation: "UI/UX Designer",
      workEmail: "deepanshi.m@nationalconsultingindia.com",
      department: "Software Development",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "deepanshi.mamgain18@gmail.com",
      mobileNumber: "",
      dateOfBirth: "05-09-2001",
      profileImage: null
    },
    {
      employeeNumber: "NCPL025",
      firstName: "Mohammed",
      middleName: "",
      lastName: "Faisal",
      fullName: "Mohammed Faisal",
      gender: "Male",
      dateOfJoining: "07-02-2020",
      designation: "Director Strategies and Operations",
      workEmail: "faisal@nationalconsultingindia.com",
      department: "Management",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "mohammedfaisal91@gmail.com",
      mobileNumber: "",
      dateOfBirth: "13-02-1991",
      profileImage: null
    },
    {
      employeeNumber: "NCPL009",
      firstName: "Nirup",
      middleName: "",
      lastName: "Jayanth",
      fullName: "Nirup Jayanth",
      gender: "Male",
      dateOfJoining: "04-03-2021",
      designation: "Head Design and Development",
      workEmail: "nirup.j@nationalconsultingindia.com",
      department: "Real estate",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "11-06-1981",
      profileImage: null
    },
    {
      employeeNumber: "NCPL033",
      firstName: "Neehar",
      middleName: "",
      lastName: "Jallu",
      fullName: "Neehar Jallu",
      gender: "Male",
      dateOfJoining: "24-06-2025",
      designation: "Sr Architect",
      workEmail: "neehar.j@nationalconsultingindia.com",
      department: "Real estate",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "jishnu.neehar@gmail.com",
      mobileNumber: "",
      dateOfBirth: "22-08-1991",
      profileImage: null
    },
    {
      employeeNumber: "NCPL034",
      firstName: "Rakshith",
      middleName: "",
      lastName: "R",
      fullName: "Rakshith R",
      gender: "Male",
      dateOfJoining: "02-07-2025",
      designation: "Digital Media Marketing Executive",
      workEmail: "rakshith.r@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "rakshithkulal1427@gmail.com",
      mobileNumber: "",
      dateOfBirth: "03-04-2001",
      profileImage: null
    },
    {
      employeeNumber: "NCPL032",
      firstName: "Sanjay",
      middleName: "",
      lastName: "Asthana",
      fullName: "Sanjay Asthana",
      gender: "Male",
      dateOfJoining: "15-10-2020",
      designation: "Vice President",
      workEmail: "sanjay.a@nationalconsultingindia.com",
      department: "iSky",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "25-06-1968",
      profileImage: null
    },
    {
      employeeNumber: "NCPL021",
      firstName: "Salman",
      middleName: "",
      lastName: "Khan",
      fullName: "Salman Khan",
      gender: "Male",
      dateOfJoining: "27-03-2025",
      designation: "Assistant to Director",
      workEmail: "salman.k@nationalconsultingindia.com",
      department: "Management",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "skofficial1993@gmail.com",
      mobileNumber: "7411248615",
      dateOfBirth: "16-03-1993",
      profileImage: null
    },
    {
      employeeNumber: "NCPL031",
      firstName: "Hedayath",
      middleName: "",
      lastName: "Ullah",
      fullName: "Hedayath Ullah",
      gender: "Male",
      dateOfJoining: "01-07-2025",
      designation: "Office Boy",
      workEmail: "mahinariyan60034@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "6360182195",
      dateOfBirth: "25-03-2005",
      profileImage: null
    },
    {
      employeeNumber: "NCPL013",
      firstName: "Srikantha",
      middleName: "Bhaskar",
      lastName: "Poojary",
      fullName: "Srikantha Bhaskar Poojary",
      gender: "Male",
      dateOfJoining: "01-01-2025",
      designation: "Office Admin",
      workEmail: "shreekanthanthanchan9743@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "Shreekanthanchan9743@gmail.com",
      mobileNumber: "",
      dateOfBirth: "12-08-1989",
      profileImage: null
    },
    {
      employeeNumber: "NCPL035",
      firstName: "Biplob",
      middleName: "Barman",
      lastName: "",
      fullName: "Biplob Barman",
      gender: "Male",
      dateOfJoining: "01-07-2025",
      designation: "Office Boy",
      workEmail: "barmanbiplob295@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "barmanbiplob295@gmail.com",
      mobileNumber: "",
      dateOfBirth: "19-08-1999",
      profileImage: null
    },
    {
      employeeNumber: "NCPL036",
      firstName: "Abubbakkar",
      middleName: "Siddiq",
      lastName: "B M",
      fullName: "Abubbakkar Siddiq B M",
      gender: "Male",
      dateOfJoining: "26-06-2025",
      designation: "Office Boy",
      workEmail: "siddiqbmparappu786@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "9741462876",
      dateOfBirth: "29-07-1994",
      profileImage: null
    },
    {
      employeeNumber: "NCPL005",
      firstName: "Muhammed",
      middleName: "Ameen",
      lastName: "K M",
      fullName: "Muhammed Ameen K M",
      gender: "Male",
      dateOfJoining: "01-01-2025",
      designation: "Driver",
      workEmail: "ameenmittur@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "11-01-2003",
      profileImage: null
    },
    {
      employeeNumber: "NCPL004",
      firstName: "Irshad",
      middleName: "",
      lastName: "Ahmed",
      fullName: "Irshad Ahmed",
      gender: "Male",
      dateOfJoining: "01-01-2025",
      designation: "Driver",
      workEmail: "irshad@gmail.com",
      department: "Admin",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "",
      mobileNumber: "",
      dateOfBirth: "07-08-1978",
      profileImage: null
    },
    {
      employeeNumber: "NCPL037",
      firstName: "Ahmed",
      middleName: "",
      lastName: "Atique",
      fullName: "Ahmed Atique",
      gender: "Male",
      dateOfJoining: "11-08-2025",
      designation: "Senior Manager - Financial Planning and Operations",
      workEmail: "atique.a@nationalconsultingindia.com",
      department: "Real estate",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "atiqueonnet@yahoo.com",
      mobileNumber: "",
      dateOfBirth: "14-06-1981",
      profileImage: null
    },
    {
      employeeNumber: "NCPL038",
      firstName: "Harshdeep",
      middleName: "",
      lastName: "Singh",
      fullName: "Harshdeep Singh",
      gender: "Male",
      dateOfJoining: "26-08-2025",
      designation: "Head of Marketing",
      workEmail: "harshdeep.s@nationalconsultingindia.com",
      department: "Marketing",
      workLocation: "Head Office",
      employeeStatus: "Active",
      personalEmail: "harsh9316@gmail.com",
      mobileNumber: "9967274605",
      dateOfBirth: "04-10-1988",
      profileImage: null
    }
  ];
  let searchTerm = "";
  let selectedDepartment = "All";
  let filteredEmployees = employees;
  departments = ["All", ...new Set(employees.map((emp) => emp.department))];
  {
    {
      filteredEmployees = employees.filter((employee) => {
        const matchesSearch = searchTerm === "";
        const matchesDepartment = selectedDepartment === "All";
        return matchesSearch && matchesDepartment;
      });
    }
  }
  departments.filter((dept) => dept !== "All").map((dept) => {
    const deptEmployees = employees.filter((emp) => emp.department === dept);
    const activeCount = deptEmployees.filter((emp) => emp.employeeStatus === "Active").length;
    return {
      department: dept,
      total: deptEmployees.length,
      active: activeCount,
      inactive: deptEmployees.length - activeCount
    };
  });
  return `${$$result.head += `<!-- HEAD_svelte-tq1jp1_START -->${$$result.title = `<title>People - Zoho People Dashboard</title>`, ""}<meta name="description" content="Employee directory and management"><!-- HEAD_svelte-tq1jp1_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800"> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12"> <aside class="lg:col-span-2">${validate_component(Sidebar, "Sidebar").$$render($$result, { currentPath: "/employees" }, {}, {})}</aside>  <main class="lg:col-span-10 space-y-6"> <div class="card"><div class="card-content"><div class="flex items-center justify-between"><div><div class="flex items-center gap-3 mb-2">${validate_component(Users, "Users").$$render($$result, { class: "w-8 h-8 text-gold-600" }, {}, {})} <h1 class="text-3xl font-bold text-zinc-900">People (${escape(filteredEmployees.length)})</h1></div> <p class="text-zinc-600" data-svelte-h="svelte-etzcxx">Employee directory and management</p></div> <div class="flex gap-3"><button class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg flex items-center gap-2">${validate_component(Upload, "Upload").$$render($$result, { class: "w-4 h-4" }, {}, {})}
								Bulk Upload</button> <button class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center gap-2">${validate_component(Download, "Download").$$render($$result, { class: "w-4 h-4" }, {}, {})}
								Export</button> <button class="bg-gradient-to-r from-gold-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-amber-600 transition-all duration-200 shadow-lg flex items-center gap-2">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4" }, {}, {})}
								Add Employee</button></div></div></div></div>  <div class="card"><div class="card-content"><div class="flex flex-col lg:flex-row gap-4 items-center justify-between"> <div class="flex-1 max-w-md"><div class="relative">${validate_component(Search, "Search").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4"
    },
    {},
    {}
  )} <input type="text" placeholder="Search people..." class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"${add_attribute("value", searchTerm, 0)}></div></div>  <div class="flex gap-4 items-center"> <div class="flex bg-zinc-100 rounded-lg p-1"><button class="${"px-3 py-1 text-sm rounded-md transition-colors " + escape(
    "bg-white text-zinc-900 shadow-sm",
    true
  )}">Everyone</button> <button class="${"px-3 py-1 text-sm rounded-md transition-colors " + escape(
    "text-zinc-600 hover:text-zinc-900",
    true
  )}">Recent</button> <button class="${"px-3 py-1 text-sm rounded-md transition-colors " + escape(
    "text-zinc-600 hover:text-zinc-900",
    true
  )}">Following</button> <button class="${"px-3 py-1 text-sm rounded-md transition-colors " + escape(
    "text-zinc-600 hover:text-zinc-900",
    true
  )}">Followers</button></div>  <div class="relative">${validate_component(Filter, "Filter").$$render(
    $$result,
    {
      class: "absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4"
    },
    {},
    {}
  )} <select class="pl-10 pr-8 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white">${each(departments, (dept) => {
    return `<option${add_attribute("value", dept, 0)}>${escape(dept)}</option>`;
  })}</select></div>  <div class="flex bg-zinc-100 rounded-lg p-1"><button class="${"p-2 rounded-md transition-colors " + escape(
    "bg-white shadow-sm",
    true
  )}" title="Grid View"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button> <button class="${"p-2 rounded-md transition-colors " + escape(
    "hover:bg-zinc-200",
    true
  )}" title="List View"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path></svg></button></div></div></div></div></div>  ${` <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">${each(filteredEmployees, (employee) => {
    return `<div class="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"><div class="card-content relative"> <div class="absolute top-4 right-4"><div class="relative group"><button class="p-1 rounded-full hover:bg-zinc-100 transition-colors">${validate_component(More_vertical, "MoreVertical").$$render($$result, { class: "w-4 h-4 text-zinc-400" }, {}, {})}</button> <div class="absolute right-0 top-8 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 min-w-[120px]"><button class="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2">${validate_component(Eye, "Eye").$$render($$result, { class: "w-3 h-3" }, {}, {})}
												View Details</button> <button class="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2">${validate_component(Pen_square, "Edit").$$render($$result, { class: "w-3 h-3" }, {}, {})}
												Edit</button> <button class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">${validate_component(Trash_2, "Trash2").$$render($$result, { class: "w-3 h-3" }, {}, {})}
												Delete
											</button></div> </div></div>  <div class="text-center mb-4"><div class="relative inline-block">${employee.profileImage ? `<img${add_attribute("src", employee.profileImage, 0)}${add_attribute("alt", employee.fullName, 0)} class="w-16 h-16 rounded-full object-cover mx-auto border-4 border-white shadow-lg">` : `<div class="${"w-16 h-16 rounded-full " + escape(getAvatarColor(employee), true) + " text-white flex items-center justify-center text-lg font-semibold mx-auto border-4 border-white shadow-lg"}">${escape(getInitials(employee))} </div>`} <div class="${"absolute -bottom-1 -right-1 w-5 h-5 rounded-full " + escape(
      employee.employeeStatus === "Active" ? "bg-green-500" : "bg-gray-400",
      true
    ) + " border-2 border-white"}"></div></div> <h3 class="text-lg font-semibold text-zinc-900 mt-3 mb-1">${escape(employee.fullName)}</h3> <p class="text-sm text-zinc-600 mb-2">${escape(employee.designation)}</p> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">${escape(employee.department)} </span></div>  <div class="space-y-2 text-sm"><div class="flex items-center gap-2 text-zinc-600"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> <span class="truncate">${escape(employee.workEmail)}</span></div> ${employee.mobileNumber ? `<div class="flex items-center gap-2 text-zinc-600"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> <span>${escape(employee.mobileNumber)}</span> </div>` : ``} <div class="flex items-center gap-2 text-zinc-600"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillrule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" cliprule="evenodd"></path></svg> <span>Joined ${escape(employee.dateOfJoining)}</span></div> </div></div> </div>`;
  })}</div>`}  ${filteredEmployees.length === 0 ? `<div class="text-center py-12">${validate_component(Users, "Users").$$render($$result, { class: "mx-auto h-12 w-12 text-zinc-400" }, {}, {})} <h3 class="mt-2 text-sm font-medium text-zinc-900" data-svelte-h="svelte-jrqsi8">No employees found</h3> <p class="mt-1 text-sm text-zinc-500">${`Get started by adding a new employee.`}</p> ${`<div class="mt-6"><button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500">${validate_component(Plus, "Plus").$$render($$result, { class: "w-4 h-4 mr-2" }, {}, {})}
								Add Employee</button></div>`}</div>` : ``}</main></div></div>  ${``}  ${``}  ${``}  ${``}`;
});
export {
  Page as default
};
