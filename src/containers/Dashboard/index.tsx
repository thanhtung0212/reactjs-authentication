import { Button, UncontrolledPopover } from "reactstrap";
import DashboardImg from "../../assets/dashboard.png";
import { IcAvatar, IcLogout } from "../../assets/svgs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { postLogout } from "../../store/appReducer";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.app);
  /* Render */
  return (
    <div>
      <div className='d-flex justify-content-end p-3 bg-white'>
        <div className='me-2'>
          <p className='mb-0' style={{ fontSize: "14px" }}>
            {`${user?.firstName} ${user?.lastName}`}
          </p>
          <p className='mb-0' style={{ color: "#B9B9C3", fontSize: "12px" }}>
            Available
          </p>
        </div>

        <div>
          <Button
            id='ScheduleUpdateButton'
            type='button'
            color='link'
            className='p-0'
          >
            <IcAvatar />
          </Button>
          <UncontrolledPopover
            placement='bottom'
            target='ScheduleUpdateButton'
            trigger='click'
          >
            <div>
              <Button
                color='link'
                style={{ textDecoration: "unset" }}
                onClick={() => dispatch(postLogout())}
              >
                <span style={{ color: "#6E6B7B", textDecoration: "unset" }}>
                  Logout <IcLogout />
                </span>
              </Button>
            </div>
          </UncontrolledPopover>
        </div>
      </div>
      <div
        className='d-flex flex-column align-items-center justify-content-center h-100 text-center'
        style={{ minHeight: "calc(100vh - 71px)" }}
      >
        <h4>Welcome to Demo App</h4>
        <img style={{ maxWidth: "600px" }} src={DashboardImg} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10
        }}
      >
        COPYRIGHT © 2020
      </div>
    </div>
  );
};

export default Dashboard;
