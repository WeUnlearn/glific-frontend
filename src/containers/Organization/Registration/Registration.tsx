import React, { useState } from 'react';
import axios from 'axios';
import { InputAdornment, Link } from '@material-ui/core';
import * as Yup from 'yup';

import styles from './Registration.module.css';
import { Input } from '../../../components/UI/Form/Input/Input';
import { Organization } from '../Organization';
import { PhoneInput } from '../../../components/UI/Form/PhoneInput/PhoneInput';
import { ONBOARD_URL } from '../../../config/index';
import Tooltip from '../../../components/UI/Tooltip/Tooltip';
import { ReactComponent as InfoIcon } from '../../../assets/images/icons/Info.svg';
import { GUPSHUP_DOCUMENTATION_HELP_LINK } from '../../../common/constants';

export interface RegistrationProps {
  title: string;
  buttonText: string;
  handleStep?: any;
}

const InfoAdornment = (
  <InputAdornment position="end" className={styles.InputAdornment}>
    <Tooltip
      title="You can customize your Glific account URL as shown in preview"
      placement="right"
      tooltipClass={styles.Tooltip}
    >
      <InfoIcon />
    </Tooltip>
  </InputAdornment>
);

const HelperLink = (
  <Link
    className={styles.HelperLink}
    href={GUPSHUP_DOCUMENTATION_HELP_LINK}
    rel="noreferrer"
    target="_blank"
  >
    Help?
  </Link>
);

const formFields = [
  {
    component: Input,
    name: 'name',
    type: 'text',
    placeholder: 'NGO name',
  },
  {
    component: PhoneInput,
    name: 'phone',
    type: 'phone',
    placeholder: 'NGO WhatsApp number',
    helperText: 'Please enter a phone number.',
  },
  {
    component: Input,
    name: 'app_name',
    type: 'text',
    placeholder: 'App name',
  },
  {
    component: Input,
    name: 'api_key',
    type: 'text',
    placeholder: 'GupShup API keys',
    helperText: HelperLink,
  },
  {
    component: Input,
    name: 'shortcode',
    type: 'text',
    placeholder: 'URL Shortcode',
    endAdornment: InfoAdornment,
    helperText: 'www.shortcode.tides.coloredcow.com',
  },
  {
    component: Input,
    name: 'email',
    type: 'text',
    placeholder: 'Your email id',
  },
];

const FormSchema = Yup.object().shape({
  name: Yup.string().required('NGO name is required'),
  phone: Yup.string().required('NGO whatsapp number is required'),
  app_name: Yup.string().required('App name is required'),
  api_key: Yup.string()
    .test('len', 'Invalid API Key', (val) => val?.length === 32)
    .required('API key is required'),
  email: Yup.string().email().required('Email is required'),
  shortcode: Yup.string().required('NGO shortcode url is required'),
});

const initialFormValues = {
  name: '',
  phone: '',
  app_name: '',
  api_key: '',
  email: '',
  shortcode: '',
};

export const Registration: React.SFC<RegistrationProps> = (props) => {
  const { title, buttonText, handleStep } = props;
  const [registrationError, setRegistrationError] = useState('');
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    handleStep();
  }

  const handleSubmit = (values: any, captcha: any, setErrors: any, setLoading: any) => {
    if (captcha) {
      axios.post(ONBOARD_URL, values).then(({ data }: { data: any }) => {
        if (data.is_valid) {
          setRedirect(true);
        } else {
          setRegistrationError(data.messages?.global);
          if (setErrors && setLoading) {
            const errors = data.messages;
            delete errors.global;
            setErrors(errors);
            setLoading(false);
          }
        }
      });
    }
  };

  return (
    <Organization
      pageTitle={title}
      buttonText={buttonText}
      formFields={formFields}
      validationSchema={FormSchema}
      saveHandler={handleSubmit}
      errorMessage={registrationError}
      initialFormValues={initialFormValues}
    />
  );
};

export default Registration;