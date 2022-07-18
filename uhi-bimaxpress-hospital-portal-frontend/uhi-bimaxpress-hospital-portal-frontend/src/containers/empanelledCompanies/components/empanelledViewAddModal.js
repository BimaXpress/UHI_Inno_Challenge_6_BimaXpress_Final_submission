import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import styles from './empanelledViewAddModal.module.css';
import Input from '../../shared/input/input';
import SharedButton from '../../shared/button';
import notification from '../../shared/notification';
import axios from 'axios';
import SearchableSelect from '../../shared/searchableSelect/searchableSelect';
const EmpanelledViewAddModal = (props) => {
  const {
    userDetails,
    setSharedLoaderActivity,
    openEmpanelledViewAddModal,
    toggleOpenEmpanelledViewAddModal,
    empanelledViewAddModalType,
    selctedEmpanelledCompany,
    setEmpanelledViewAddModalType,
    fetchEmpanelledCompany,
  } = props;

  const [empanelCompanyDetails, setEmpanelCompanyDetails] = useState({
    companyId: '',
    name: '',
    discount: 0,
    exclusion: 0,
    username: '',
    password: '',
    ratelist: '',
    ratelistOrignalFileName: '',
    selectedTpaInsurance: null,
  });

  const [empanelCompanyDetailsError, setEmpanelCompanyDetailsError] = useState({
    companyId: '',
    discount: '',
    exclusion: '',
    username: '',
    password: '',
    ratelist: '',
  });

  const [editFields, setEditFields] = useState(false);

  useEffect(() => {
    switch (empanelledViewAddModalType) {
      case 'summary':
        setEmpanelCompanyDetails((pre) => ({
          ...pre,
          ...selctedEmpanelledCompany,
        }));
        setEditFields(false);
        break;
      case 'update':
        setEmpanelCompanyDetails((pre) => ({
          ...pre,
          ...selctedEmpanelledCompany,
        }));
        setEditFields(true);
        break;
      case 'new':
        setEditFields(true);
        break;
    }
  }, [empanelledViewAddModalType]);

  const handleChangeEmpanelDetails = (field) => {
    const { name, value } = field.target;

    if (name === 'uploadRateList' && field.target.files.length !== 0) {
      uploadRatelistFile(field);

      setEmpanelCompanyDetailsError((pre) => ({ ...pre, ratelist: '' }));
    }

    if (name !== 'uploadRateList') {
      setEmpanelCompanyDetails((pre) => ({ ...pre, [name]: value }));
      setEmpanelCompanyDetailsError((pre) => ({ ...pre, [name]: '' }));
    }
  };

  const handleSaveEmpanelCompany = async () => {
    if (empanelCompanyDetails.companyId === '') {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        companyId: 'Need to select TPA/Insurance Company Name',
      }));
      return notification(
        'warning',
        'Need to select TPA/Insurance Company Name'
      );
    }

    if (!empanelCompanyDetails.discount) {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        discount: 'Need to enter discount',
      }));
      return notification('warning', 'Need to enter discount');
    }

    if (!empanelCompanyDetails.exclusion) {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        exclusion: 'Need to enter exclusion',
      }));
      return notification('warning', 'Need to enter exclusion');
    }

    if (empanelCompanyDetails.username.length < 4) {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        username: 'Need to enter a vaild username',
      }));
      return notification('warning', 'Need to enter a vaild username');
    }

    if (empanelCompanyDetails.password.length < 4) {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        password: 'Need to enter a vaild password',
      }));
      return notification('warning', 'Need to enter a vaild password');
    }

    if (
      empanelledViewAddModalType === 'new' &&
      empanelCompanyDetails.ratelist === ''
    ) {
      setEmpanelCompanyDetailsError((pre) => ({
        ...pre,
        ratelist: 'Need to upload rate list',
      }));
      return notification('warning', 'Need to upload rate list');
    }

    empanelCompanyDetails.exclusion = Number(empanelCompanyDetails.exclusion);

    empanelCompanyDetails.discount = Number(empanelCompanyDetails.discount);

    try {
      setSharedLoaderActivity(true);
      if (empanelledViewAddModalType === 'new') {
        await axios.post(
          `${process.env.REACT_APP_HOSPITAL_API}/empanelledCompany/addCompany?hospitalId=${userDetails.data._id}`,
          empanelCompanyDetails
        );
      }

      if (empanelledViewAddModalType === 'update') {
        await axios.put(
          `${process.env.REACT_APP_HOSPITAL_API}/empanelledCompany/updateCompany?id=${selctedEmpanelledCompany._id}`,
          empanelCompanyDetails
        );
      }

      setSharedLoaderActivity(false);
      fetchEmpanelledCompany();
      toggleOpenEmpanelledViewAddModal();
      notification(
        'success',
        `Successfully ${
          empanelledViewAddModalType === 'new' ? 'added' : 'updated'
        }.`
      );
    } catch (error) {
      setSharedLoaderActivity(false);
      if (
        JSON.parse(error.request.response)
          ?.error?.message?.split(' ')
          ?.slice(-1)[0] === 'present'
      ) {
        toggleOpenEmpanelledViewAddModal();
        notification('info', 'Company Already Present!');
      } else {
        notification('error', error.message);
      }
    }
  };

  const handleDeleteCompany = async () => {
    try {
      setSharedLoaderActivity(true);
      await axios.delete(
        `${process.env.REACT_APP_HOSPITAL_API}/empanelledCompany/deleteCompany?hospitalId=${userDetails.data._id}&id=${selctedEmpanelledCompany._id}`
      );
      setSharedLoaderActivity(false);

      fetchEmpanelledCompany();
      toggleOpenEmpanelledViewAddModal();
      notification('success', 'Successfully Deleted!');
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  // Message Upload & Remove Rate List
  const handleRemoveRateList = () => {
    setEmpanelCompanyDetails((pre) => ({
      ...pre,
      ratelist: '',
      ratelistOrignalFileName: '',
    }));
  };

  const uploadRatelistFile = async (field) => {
    const uploadFileFormData = new FormData();
    setEmpanelCompanyDetails((pre) => ({
      ...pre,
      ratelistOrignalFileName: field?.target?.files[0]?.name,
    }));

    uploadFileFormData.append('uploadFile', field?.target?.files[0]);
    uploadFileFormData.append(
      'folderName',
      `Hospital/${userDetails.data.email}/ratelist`
    );
    uploadFileFormData.append('fileName[0]', 'ratelist');

    setSharedLoaderActivity(true);
    try {
      const { data } = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_HOSPITAL_API}/uploadFiles`,
        data: uploadFileFormData,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      setEmpanelCompanyDetails((pre) => ({
        ...pre,
        ratelist: data.urls[0].url,
      }));

      setSharedLoaderActivity(false);
    } catch (error) {
      setSharedLoaderActivity(false);
      notification('error', error.message);
    }
  };

  //  Message SearchSelect
  function handleChangeSelect(selectedOption) {
    setEmpanelCompanyDetails((pre) => ({
      ...pre,
      companyId: selectedOption ? selectedOption._id : '',
      name: selectedOption ? selectedOption.name : '',
      selectedTpaInsurance: selectedOption,
    }));

    setEmpanelCompanyDetailsError((pre) => ({ ...pre, companyId: '' }));
  }

  const serachTpaInsuranceCompany = async (search) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_HOSPITAL_API}/insuranceTpa/getInsuranceTpa?name=${search}`,
        {
          params: {
            limit: 5,
            page: 1,
          },
        }
      );

      return data.data;
    } catch (error) {
      notification('error', error.message);
    }
  };

  return (
    <Modal
      isOpen={openEmpanelledViewAddModal}
      className={`absolute top-1/2 left-1/2 max-w-[800px] outline-none ${styles.modalContainer}`}
      overlayClassName={`fixed top-0 left-0 right-0 bottom-0 ${styles.overlayContainer}`}
      ariaHideApp={false}
      onRequestClose={toggleOpenEmpanelledViewAddModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={` relative w-full overflow-y-hidden rounded px-6 py-4 bg-baseColor lg:h-auto  sm:overflow-y-auto sm:h-[450px] ${styles.mainContainer}`}
      >
        <IoClose
          className='absolute top-4 right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer'
          onClick={toggleOpenEmpanelledViewAddModal}
        />

        <p className='text-white text-2xl'>
          {empanelledViewAddModalType === 'summary' ||
          empanelledViewAddModalType === 'update' ? (
            <div className='flex'>
              <img
                src={selctedEmpanelledCompany.imageURL}
                className='w-12 mr-2'
              />
              {selctedEmpanelledCompany.name.replace(/_/g, ' ')}
            </div>
          ) : (
            'Add Empanelled Company'
          )}
        </p>

        <div className='flex justify-end gap-x-2'>
          {empanelledViewAddModalType === 'summary' && (
            <SharedButton
              handleClick={() => setEmpanelledViewAddModalType('update')}
              style='!bg-white !text-black'
              text={
                <>
                  <i className='fa-solid fa-pen mr-1' />
                  Edit
                </>
              }
            />
          )}

          {(empanelledViewAddModalType === 'summary' ||
            empanelledViewAddModalType === 'update') && (
            <SharedButton
              handleClick={() => {
                handleDeleteCompany();
              }}
              style='!bg-red-500'
              text={
                <>
                  <i className='fa-solid fa-trash mr-1'></i>
                  Delete
                </>
              }
            />
          )}
        </div>
        {/* TPA/Insurance Select */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6'>
          {empanelledViewAddModalType === 'new' && (
            <div>
              <SearchableSelect
                label={
                  <>
                    TPA/Insurance Company Name
                    <span className='text-red-500 ml-1'>*</span>
                  </>
                }
                name='tpaInsuranceSearch'
                loadOptions={serachTpaInsuranceCompany}
                selectValue={empanelCompanyDetails?.selectedTpaInsurance}
                selectPlaceHolder='Search empanelled companies'
                handleChangeSelect={handleChangeSelect}
              />
            </div>
          )}

          <Input
            handleChange={handleChangeEmpanelDetails}
            name='discount'
            value={empanelCompanyDetails.discount || ''}
            label={
              <>
                Discount
                {editFields ? <span className='ml-1 text-red-500'>*</span> : ''}
              </>
            }
            placeHolder='Discount'
            labelClass='text-white'
            inputStyle='h-9'
            type='Number'
            isEdit={editFields}
            message={empanelCompanyDetailsError.discount}
            status={!empanelCompanyDetailsError.discount ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeEmpanelDetails}
            name='exclusion'
            value={empanelCompanyDetails.exclusion || ''}
            label={
              <>
                Exclusion
                {editFields ? <span className='ml-1 text-red-500'>*</span> : ''}
              </>
            }
            placeHolder='Exclusion'
            labelClass='text-white'
            inputStyle='h-9'
            type='Number'
            isEdit={editFields}
            message={empanelCompanyDetailsError.exclusion}
            status={!empanelCompanyDetailsError.exclusion ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeEmpanelDetails}
            name='username'
            value={empanelCompanyDetails.username}
            label={
              <>
                Username
                {editFields ? <span className='ml-1 text-red-500'>*</span> : ''}
              </>
            }
            placeHolder='Username'
            labelClass='text-white'
            inputStyle='h-9'
            isEdit={editFields}
            message={empanelCompanyDetailsError.username}
            status={!empanelCompanyDetailsError.username ? 'active' : 'error'}
          />

          <Input
            handleChange={handleChangeEmpanelDetails}
            name='password'
            value={empanelCompanyDetails.password}
            label={
              <>
                Password
                {editFields ? <span className='ml-1 text-red-500'>*</span> : ''}
              </>
            }
            placeHolder='Password'
            labelClass='text-white'
            inputStyle='h-9'
            type='password'
            isEdit={editFields}
            message={empanelCompanyDetailsError.password}
            status={!empanelCompanyDetailsError.password ? 'active' : 'error'}
          />

          {/* RateList Upload */}
          {(empanelledViewAddModalType === 'new' ||
            empanelledViewAddModalType === 'update') && (
            <div>
              <p className='text-white font-semibold mt-3'>
                Rate List<span className='text-red-500 ml-1'>*</span>
              </p>

              <div className='flex my-4 items-center'>
                <label
                  htmlFor='rateListUpload'
                  className='bg-blue-500 cursor-pointer p-1 px-2 text-white rounded'
                >
                  {empanelledViewAddModalType === 'new'
                    ? 'Upload Rate List'
                    : 'Update Rate List'}
                  <input
                    id='rateListUpload'
                    type='file'
                    className='hidden'
                    name='uploadRateList'
                    onChange={handleChangeEmpanelDetails}
                    onClick={(e) => {
                      e.target.value = '';
                    }}
                  />
                </label>

                {empanelCompanyDetails?.ratelistOrignalFileName ? (
                  <div className='flex bg-primary p-1 ml-2 rounded items-center'>
                    <p
                      className='text-gray-300 select-none w-28 h-6 overflow-hidden cursor-pointer'
                      onClick={() => {
                        window.open(empanelCompanyDetails.ratelist);
                      }}
                    >
                      {empanelCompanyDetails?.ratelistOrignalFileName}
                    </p>
                    <i
                      className='fa-solid fa-xmark text-red-500 cursor-pointer mx-2'
                      onClick={handleRemoveRateList}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {empanelledViewAddModalType === 'summary' && (
            <div className='py-3'>
              <button
                onClick={() => window.open(selctedEmpanelledCompany.ratelist)}
                className='outline-none text-blue-600  text-base p-1'
              >
                View Rate List
              </button>
            </div>
          )}
        </div>

        {(empanelledViewAddModalType === 'new' ||
          empanelledViewAddModalType === 'update') && (
          <div className='flex justify-end gap-x-2 mt-2'>
            {/* <SharedButton
              handleClick={toggleOpenEmpanelledViewAddModal}
              text='Cancel'
              style='!bg-white text-black'
              name='cancel'
            /> */}
            <SharedButton
              handleClick={handleSaveEmpanelCompany}
              text='Save'
              style='!bg-green-500'
              name='save'
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EmpanelledViewAddModal;
