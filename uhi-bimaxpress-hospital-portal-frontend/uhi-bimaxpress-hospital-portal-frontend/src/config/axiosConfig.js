import axios from 'axios';

// const API = "ec2-3-110-207-150.ap-south-1.compute.amazonaws.com";
const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_CASE_API}/`,
});

export default axiosConfig;
