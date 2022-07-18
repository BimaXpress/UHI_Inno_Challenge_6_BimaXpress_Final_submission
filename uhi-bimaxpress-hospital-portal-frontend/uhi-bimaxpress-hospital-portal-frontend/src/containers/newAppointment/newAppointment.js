import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgessBar from './components/progessBar/progessBar';
import PatientDetails from './components/patientDetails';
import AppointmentDetails from './components/appointmentDetails';
import SharedButton from '../shared/button';
import notification from '../shared/notification';
import axios from 'axios';
import { format } from 'date-fns';

const NewAppointment = (props) => {
  const { setNavbarHeadingActivity, setSharedLoaderActivity } = props;

  const { userDetails } = props.state;

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [patientDetails, setPatientDetails] = useState({
    email: '',
    name: '',
    contactNumber: {
      number: '',
    },
    age: '',
    address: '',
    gender: 'male',
    password: '',
    isNew: true,
  });

  const [appointemnetDetails, setAppointemnetDetails] = useState({
    doctor: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    slot: '',
  });

  const [slotOptions, setSlotOptions] = useState([]);

  const [doctorOptions, setDoctorOptions] = useState([]);

  const fetchDoctor = async () => {
    setSharedLoaderActivity(true);
    try {
      const {
        data: { data },
      } = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/doctor/getDoctors?hospital=${userDetails?.data?._id}`
      );

      setDoctorOptions(
        data.map((doctor) => ({
          ...doctor,
          label: doctor.name,
          value: doctor._id,
        }))
      );

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  const fetchSlotOptions = () => {
    const selectedDoctorSlots = doctorOptions?.filter(
      (doctor) => doctor._id === appointemnetDetails.doctor
    )[0]?.slots;

    let selectedDoctorSlotOptions = selectedDoctorSlots?.map((slot) => {
      if (
        slot?.status === 'active' &&
        format(new Date(slot?.date), 'yyyy-MM-dd') === appointemnetDetails?.date
      ) {
        return {
          ...slot,
          label: `${slot?.slotStart} - ${slot?.slotEnd}`,
          value: slot._id,
        };
      }
    });

    selectedDoctorSlotOptions = selectedDoctorSlotOptions.filter(
      (options) => options !== undefined
    );

    setSlotOptions(selectedDoctorSlotOptions);
  };

  const handleChangePatientDetails = (field) => {
    const { name, value } = field.target;

    if (name === 'number') {
      setPatientDetails((pre) => ({
        ...pre,
        contactNumber: { ...pre.contactNumber, [name]: value },
      }));
    } else {
      setPatientDetails((pre) => ({ ...pre, [name]: value }));
    }
  };

  const handleChangeAppointemnetDetails = (field) => {
    const { name, value } = field.target;
    setAppointemnetDetails((pre) => ({ ...pre, [name]: value }));
  };

  const checkPatientDetails = () => {
    if (patientDetails?.name?.length < 3) {
      notification('warning', 'Vaild name is required');
      return false;
    }

    if (!patientDetails?.gender?.length) {
      notification('warning', 'Need to select gender');
      return false;
    }

    if (String(patientDetails?.contactNumber?.number).length !== 10) {
      notification('warning', 'Vaild Contact Number is required');
      return false;
    }

    if (patientDetails?.age < 1 || patientDetails?.age > 123) {
      notification('warning', 'Vaild age is required');
      return false;
    }

    if (String(patientDetails?.address).length < 4) {
      notification(
        'warning',
        'Atleast four characters long address is required'
      );

      return false;
    }

    return true;
  };

  const checkAppointmentDetails = () => {
    if (!appointemnetDetails?.doctor) {
      notification('warning', 'Select doctor');
      return false;
    }

    if (String(appointemnetDetails?.date).length !== 10) {
      notification('warning', 'Enter a vaild date');
      return false;
    }

    if (!appointemnetDetails?.slot) {
      notification('warning', 'Select slot');
      return false;
    }

    return true;
  };

  const handleTabChange = (newTab) => {
    if (step < newTab) {
      if (step === 1 && !checkPatientDetails()) {
        return;
      }
    }
    setStep(newTab);
  };

  const handleBookAppointment = async () => {
    if (!checkAppointmentDetails()) {
      return;
    }

    const slotSelected = slotOptions.filter(
      (slot) => slot.value === appointemnetDetails?.slot
    )[0];

    const doctorSelected = doctorOptions.filter(
      (doctor) => doctor.value === appointemnetDetails.doctor
    )[0];

    let appointemtBody = {
      patientDetails: {
        id: patientDetails._id ? patientDetails._id : '',
        name: patientDetails?.name,
        contactNumber: {
          number: patientDetails?.contactNumber?.number,
        },
        age: patientDetails?.age,
        address: patientDetails?.address,
        gender: patientDetails?.gender,
      },
      doctorDetails: {
        name: doctorSelected?.name,
        email: doctorSelected?.email,
        contactNumber: {
          number: doctorSelected?.contactNumber?.number
            ? doctorSelected?.contactNumber?.number
            : '',
        },
        id: doctorSelected?._id,
        qualification: doctorSelected?.qualification,
        specializations: doctorSelected?.specializations,
        registrationNumber: doctorSelected?.registrationNumber,
      },
      hospitalDetails: {
        id: userDetails?.data?._id,
        name: userDetails?.data?.name,
        email: userDetails?.data?.email,
        address: userDetails?.data?.currentAddress,
      },

      date: format(new Date(slotSelected?.date), 'yyyy-MM-dd'),
      slotStart: slotSelected?.slotStart,
      slotEnd: slotSelected?.slotEnd,
      slotId: slotSelected?.value,
      duration: Number(slotSelected?.duration),
      status: 'scheduled',
    };

    try {
      setSharedLoaderActivity(true);

      // Message If Patient is new and we have Patient's email
      if (patientDetails?.isNew && patientDetails?.email) {
        const newPatient = await axios.post(
          `${process.env.REACT_APP_HOSPITAL_API}/customer/registerCustomer`,
          patientDetails
        );

        appointemtBody.patientDetails.id = newPatient?.data?.data?._id;
      }

      // Message Updateing Slot to booked
      await axios.put(
        `${process.env.REACT_APP_HOSPITAL_API}/slot/updateSlot?slotId=${slotSelected?._id}`,
        {
          status: 'booked',
          customerId: appointemtBody.patientDetails.id,
        }
      );

      // Message Creating Slot

      await axios.post(
        `${process.env.REACT_APP_HOSPITAL_API}/appointment/createAppointment`,
        appointemtBody
      );

      notification('success', 'Successfully scheduled appointment');
      navigate('/appointmentHome');

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  function renderTab() {
    switch (step) {
      case 1:
        return (
          <PatientDetails
            patientDetails={patientDetails}
            setPatientDetails={setPatientDetails}
            handleChangePatientDetails={handleChangePatientDetails}
          />
        );
        break;

      case 2:
        return (
          <AppointmentDetails
            userDetails={userDetails}
            setSharedLoaderActivity={setSharedLoaderActivity}
            doctorOptions={doctorOptions}
            slotOptions={slotOptions}
            fetchDoctor={fetchDoctor}
            appointemnetDetails={appointemnetDetails}
            handleChangeAppointemnetDetails={handleChangeAppointemnetDetails}
          />
        );
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    setNavbarHeadingActivity('New Appointment');
  }, []);

  useEffect(() => {
    if (appointemnetDetails?.doctor && appointemnetDetails?.date) {
      setAppointemnetDetails((pre) => ({ ...pre, slot: '' }));
      fetchSlotOptions();
    } else {
      setAppointemnetDetails((pre) => ({ ...pre, slot: '' }));
      setSlotOptions([]);
    }
  }, [appointemnetDetails?.doctor, appointemnetDetails?.date]);

  return (
    <div className='h-full bg-black mx-6 my-5 rounded relative p-4 px-4 sm:px-8'>
      <div className='flex w-full justify-center'>
        <div className='flex justify-center px-2 rounded py-2 bg-baseColor lg:w-[calc(50%-150px)] md:w-full'>
          <ProgessBar step={step} setStep={handleTabChange} />
        </div>
      </div>

      <div className='mt-2'>{renderTab()}</div>

      <div className='absolute bottom-5 right-8 mt-5'>
        <div className='flex gap-x-3'>
          {step != 1 && (
            <SharedButton
              text='Previous'
              style='!bg-orange'
              handleClick={() => {
                handleTabChange(step - 1);
              }}
            />
          )}
          {step === 2 ? (
            <SharedButton
              text='Book Appointment'
              style='!bg-orange'
              handleClick={handleBookAppointment}
            />
          ) : (
            <SharedButton
              text='Next'
              style='!bg-orange'
              handleClick={() => {
                handleTabChange(step + 1);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
