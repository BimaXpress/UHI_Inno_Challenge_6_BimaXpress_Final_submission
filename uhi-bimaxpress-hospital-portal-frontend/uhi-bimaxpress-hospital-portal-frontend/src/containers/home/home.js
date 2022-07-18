import React, { useEffect, useState } from "react";
import HomeCard from "../shared/homeCard";
import style from "./home.module.css";
import axios from "axios";
import SharedSelect from "../shared/SharedSelect";
import notification from "../shared/notification";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import SharedButton from "../shared/button";

//message Card Icons
import approved from "../../assets/icon/approved.svg";
import dischargedApproved from "../../assets/icon/dischargedApproved.svg";
import draft from "../../assets/icon/draft.svg";
import query from "../../assets/icon/noun_query_3407971.svg";
import process from "../../assets/icon/process.svg";
import reject from "../../assets/icon/reject.svg";
import { Footer } from "../shared/footer";
import ReactApexChart from "react-apexcharts";

const Home = (props) => {
  const {
    setHospitalSelectedActivity,
    setSharedLoaderActivity,
    setNavbarHeadingActivity,
  } = props;
  const { bnplHospitalList, hospitalSelected, userDetails } = props.state;
  const [hospitalSelectOptions, sethospitalSelectOptions] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [series, setSeries] = useState([]);

  const navigate = useNavigate();

  // Message dashbaord card
  const [menuList, setMenuList] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (Object.entries(userDetails).length && refreshCount <= 1) {
      getMenuItems();
    }

    setNavbarHeadingActivity("Dashboard");
  }, [userDetails, refreshCount]);

  const getMenuItems = async () => {
    try {
      setSharedLoaderActivity(true);
      const menuDetails = await axios.get(
        `${process.env.REACT_APP_CASE_API}/case/getCasesCount?hospitalId=${userDetails?.data?._id}`
      );
      setRefreshCount((pre) => pre + 1);
      setMenuList(menuDetails.data.counts);
      setCases(menuDetails.data.cases);
      setSeries(menuDetails.data.graphCount);
      setSharedLoaderActivity(false);
    } catch (error) {
      //@ts-ignore
      console.log("Menu .....", error);
      notification("error", error?.message);
    }
  };

  function goToPage(bucket) {
    navigate(`/caseBucket/${bucket}`);
  }

  var options = {
    chart: {
      type: "polarArea",
    },
    stroke: {
      width: 0,
    },
    fill: {
      opacity: 0.8,
      colors: [
        "#3b82f6",
        "#10b981",
        "#eab308",
        "#22c55e",
        "#fca5a5",
        "#14b8a6",
        "#22d3ee",
        "#3b82f6",
        "#14b8a6",
      ],
    },
    labels: [
      "Draft",
      "Unprocess",
      "Query",
      "Approved",
      "Reject",
      "Enhance",
      "Fci",
      "Discharge Approved",
      "Settled",
    ],
    colors: [
      "#3b82f6",
      "#10b981",
      "#eab308",
      "#22c55e",
      "#fca5a5",
      "#14b8a6",
      "#22d3ee",
      "#3b82f6",
      "#14b8a6",
    ],
    legend: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
      style: {
        fontSize: "8px",
        fontWeight: "light",
        colors: ["#ffffff"],
      },
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
        legend: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          stroke: {
            width: 0,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div>
      {Object.entries(userDetails).length && (
        <div className="flex flex-col items-end py-2">
          <SharedButton
            handleClick={() => {
              navigate("/addNewCase");
            }}
            text={
              <>
                <i className="fa-solid fa-plus mr-2"></i>Add Case
              </>
            }
            style="bg-green-500 bg-opacity-70 mx-8 !px-3 hover:bg-opacity-40 rounded border-2 border-green-800 border-opacity-50 font-normal"
          />
          {menuList.length !== 0 && cases.length !== 0 ? (
            <div className="w-full flex px-5 my-2 ">
              <div className={` h-full w-3/4 rounded-md p-3`}>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
                  {menuList &&
                    menuList?.map((menu, index) => {
                      return (
                        <div
                          key={index + "homeDiv"}
                          className={`shadow rounded`}
                          onClick={() => goToPage(menu.link)}
                        >
                          <HomeCard
                            name={menu.name}
                            icon={menu.icon}
                            bgHover={menu.bgHover}
                            amount={menu.amount}
                            key={index}
                            gradiant={menu.gradiant}
                            color={menu.color}
                            bgColor={menu.bgColor}
                            borderColor={menu.borderColor}
                            counts={menu.counts}
                            updateAt={
                              menu?.cases.length !== 0
                                ? menu?.cases[0].updatedAt
                                : ""
                            }
                            patientName={
                              menu?.cases.length !== 0
                                ? menu?.cases[0].patientDetails.name
                                : ""
                            }
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-1/4 p-3 flex flex-col">
                <div className="w-full flex-col justify-center items-center bg-opacity-40 bg-black rounded-md p-3">
                  <p className="text-white">Cases Stats</p>
                  <div className="mixed-chart ">
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="pie"
                    />
                  </div>
                </div>
                <p className="text-white mt-2">Recent Activity</p>
                <div>
                  {cases &&
                    cases.map((object) => {
                      return (
                        <>
                          <div className="flex flex-col w-full border-b border-primary text-white py-1.5">
                            <div className="flex flex-row justify-between">
                              <p className="text-xs font-semibold">
                                {object.patientDetails.name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {format(
                                  new Date(object.updatedAt),
                                  "d LLL Y hh:mm a"
                                )}
                              </p>
                            </div>
                            <p className="text-xs mt-1 text-orange">
                              {object.formStatus}
                            </p>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center w-full p-10">
                <img src="/empty.svg" className="w-64 mt-10"></img>
                <p className="text-white mt-10 border border-gray-600 rounded-full px-3">
                  Bucket data no Found
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
