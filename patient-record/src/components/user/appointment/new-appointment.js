import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from "yup";
import { addAppointment } from '../../../api/appointment';
import { toast } from '../../../helpers/functions/swal';
import { useState } from 'react';
import { getPatients } from '../../../api/patience-service';

const NewAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [patientIdData, setpatientIdData] = useState([])

  const loadData = async () => {
    try {
      const patientResp = await getPatients();
      setpatientIdData(patientResp.data);
    } catch (error) {
      toast(error.response.data.message, "error")
    }
  }

  const initialValues = {
    patientId: 0,
    appointmentDate: "",
    about: "",
  }

  const validationSchema = {
    patientId: Yup.number().required("Hasta seçin"),
    appointmentDate: Yup.string().required("Tarih belirtin"),
    about: Yup.string().max(2000,"maksimum 2000 karakter"),
  }

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await addAppointment(values);
      toast("Randevu kaydedildi", "success");
    } catch (error) {
      toast(error.response.data.message, "error");
    }finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  useEffect(() => {
    loadData();
  
  }, [])
  

  return (
    <div>NewAppointment</div>
  )
}

export default NewAppointment