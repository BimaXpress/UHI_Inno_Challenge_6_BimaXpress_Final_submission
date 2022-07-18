import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import styleScroll from '../../../scrollbar.module.css';

export default function SideNavbar(props) {
  const { setNavbarHeadingActivity } = props;
  const { navbarHeading, userDetails } = props.state;
  var page = window.location.href;
  const navigate = useNavigate();
  const [showFullBar, setShowFullBar] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (navbarHeading === '') {
      setNavbarHeadingActivity('Dashboard');
    }

    if (page.includes('mail')) {
      setTab(1);
      setNavbarHeadingActivity('Mail');
    } else if (page.includes('orders')) {
      setNavbarHeadingActivity('Logistics');
      setTab(2);
    } else if (page.includes('empanelledCompanies')) {
      setNavbarHeadingActivity('Empanelled Company');
      setTab(3);
    }
  }, [page]);

  const sideBarItems = [
    {
      route: '/',
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
    },

    {
      route: '/mail/inbox/1',
      name: 'Mail',
      icon: 'fa-solid fa-envelope',
    },

    {
      route: '/orders/bookOrder',
      name: 'Logistics',
      icon: 'fa-solid fa-cart-shopping',
    },

    {
      route: '/empanelledCompanies',
      name: 'Empanelled Company',
      icon: 'fa-solid fa-building',
    },
  ];

  return (
    <>
      {Object.entries(userDetails).length && (
        <div
          className={` h-full overflow-y-auto  ${
            styleScroll.customScroll
          } sm:relative bg-black shadow  flex-col items-end hidden sm:flex ${
            showFullBar ? 'w-60' : 'w-24'
          } transition-all duration-300 ease-in-out`}
        >
          <div className='h-full w-full flex flex-col mt-10 items-center'>
            <img
              className={`${
                showFullBar ? 'w-14 h-14' : 'w-10 h-10'
              } rounded-full shadow-lg shadow-gray-700 opacity-90 hover:opacity-100`}
              src='/logomain.png'
              alt=''
            />
            {showFullBar ? (
              <>
                <p className='text-white  mt-2 font-bold'>
                  {userDetails?.data?.name}
                </p>
                <p className='text-white'>{userDetails?.data?.email}</p>
              </>
            ) : (
              ''
            )}
            {/* {showFullBar ? <p className='text-white text-sm'>BNPL Admin</p> : ''} */}

            <div>
              <ul
                className={`w-full flex flex-col space-y-4 items-center justify-center ${
                  showFullBar ? 'mt-5' : 'mt-8'
                }`}
              >
                {sideBarItems.map((item, index) => {
                  return (
                    <Tooltip
                      color='#ffff'
                      placement='right'
                      title={<span className='text-black'>{item.name}</span>}
                      key={`${index}` + 'SideBar'}
                    >
                      <li
                        onClick={() => {
                          setTab(index);
                          setNavbarHeadingActivity(item.name);
                          navigate(item.route);
                        }}
                        className={`overflow-hidden transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center ${
                          tab === index
                            ? 'bg-orange bg-opacity-30'
                            : 'bg-baseColor'
                        } h-10  ${
                          showFullBar
                            ? 'w-full rounded-md px-8'
                            : 'w-10 rounded-full px-4'
                        }`}
                      >
                        <div
                          className={`w-full flex items-center ${
                            showFullBar ? 'ml-2' : 'justify-center'
                          }`}
                        >
                          <i
                            className={`${item.icon} ${
                              tab === index ? 'text-orange' : 'text-white'
                            }`}
                          ></i>

                          {showFullBar ? (
                            <p
                              className={`ml-3 ${
                                tab === index ? 'text-orange' : 'text-white'
                              }`}
                            >
                              {item.name}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    </Tooltip>
                  );
                })}
              </ul>
              {/* <div className="flex flex-col justify-end">
						<div className={`flex items-center justify-center bg-baseColor h-10 px-2 ${showFullBar ? "w-full rounded-md" : "w-10 rounded-full"}`}>
							<div className={`w-full flex items-center ${showFullBar ? "ml-5" : "justify-center"}`}>
								<i className="fa-solid fa-gear text-white"></i>

							</div>
						</div>
					</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
