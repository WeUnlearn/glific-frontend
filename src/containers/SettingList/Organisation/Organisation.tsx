import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import Typography from '@material-ui/core/Typography/Typography';
import { IconButton, InputAdornment } from '@material-ui/core';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '../../../components/UI/Form/Checkbox/Checkbox';
import { TimePicker } from '../../../components/UI/Form/TimePicker/TimePicker';
import { Loading } from '../../../components/UI/Layout/Loading/Loading';
import { AutoComplete } from '../../../components/UI/Form/AutoComplete/AutoComplete';
import { Input } from '../../../components/UI/Form/Input/Input';
import { FormLayout } from '../../Form/FormLayout';
import { GET_FLOWS } from '../../../graphql/queries/Flow';
import { GET_ORGANIZATION, USER_LANGUAGES } from '../../../graphql/queries/Organization';
import {
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from '../../../graphql/mutations/Organization';
import { GET_LANGUAGES } from '../../../graphql/queries/List';
import { ReactComponent as Settingicon } from '../../../assets/images/icons/Settings/Settings.svg';
import { ReactComponent as CopyIcon } from '../../../assets/images/icons/Settings/Copy.svg';
import { dayList, FLOW_STATUS_PUBLISHED, setVariables } from '../../../common/constants';
import { copyToClipboard } from '../../../common/utils';

const SettingIcon = <Settingicon />;

const queries = {
  getItemQuery: GET_ORGANIZATION,
  createItemQuery: CREATE_ORGANIZATION,
  updateItemQuery: UPDATE_ORGANIZATION,
  deleteItemQuery: DELETE_ORGANIZATION,
};

export const Organisation: React.SFC = () => {
  const client = useApolloClient();
  const [name, setName] = useState('');
  const [hours, setHours] = useState(true);
  const [enabledDays, setEnabledDays] = useState<any>([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [flowId, setFlowId] = useState<any>({});
  const [IsDisabled, setIsDisable] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);
  const [activeLanguages, setActiveLanguages] = useState([]);
  const [defaultLanguage, setDefaultLanguage] = useState<any>({});
  const [signaturePhrase, setSignaturePhrase] = useState();
  const [phone, setPhone] = useState<string>('');
  const { t } = useTranslation();

  const States = {
    name,
    hours,
    startTime,
    endTime,
    enabledDays,
    flowId,
    activeLanguages,
    defaultLanguage,
    signaturePhrase,
    phone,
  };

  // get the published flow list
  const { data: flow } = useQuery(GET_FLOWS, {
    variables: setVariables({
      status: FLOW_STATUS_PUBLISHED,
    }),
    fetchPolicy: 'network-only', // set for now, need to check cache issue
  });

  const { data: languages } = useQuery(GET_LANGUAGES, {
    variables: { opts: { order: 'ASC' } },
  });

  const [getOrg, { data: orgData }] = useLazyQuery<any>(GET_ORGANIZATION);

  const getEnabledDays = (data: any) => data.filter((option: any) => option.enabled);

  const setOutOfOffice = (data: any) => {
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    setEnabledDays(getEnabledDays(data.enabledDays));
  };

  const getFlow = (id: string) => flow.flows.filter((option: any) => option.id === id)[0];

  const setStates = ({
    name: nameValue,
    outOfOffice: outOfOfficeValue,
    activeLanguages: activeLanguagesValue,
    defaultLanguage: defaultLanguageValue,
    signaturePhrase: signaturePhraseValue,
    contact: contactValue,
  }: any) => {
    setName(nameValue);
    setHours(outOfOfficeValue.enabled);
    setIsDisable(!outOfOfficeValue.enabled);
    setOutOfOffice(outOfOfficeValue);
    setFlowId(getFlow(outOfOfficeValue.flowId));
    setSignaturePhrase(signaturePhraseValue);
    if (activeLanguagesValue) setActiveLanguages(activeLanguagesValue);
    if (defaultLanguageValue) setDefaultLanguage(defaultLanguageValue);
    setPhone(contactValue.phone);
  };

  useEffect(() => {
    getOrg();
  }, [getOrg]);

  useEffect(() => {
    if (orgData) {
      const data = orgData.organization.organization;
      // get login OrganizationId
      setOrganizationId(data.id);
    }
  }, [orgData]);

  if (!flow || !languages) return <Loading />;

  const handleChange = (value: any) => {
    setIsDisable(!value);
  };

  let activeLanguage: any = [];
  const validateActiveLanguages = (value: any) => {
    activeLanguage = value;
    if (!value || value.length === 0) {
      return t('Supported language is required.');
    }
    return null;
  };

  const validateDefaultLanguage = (value: any) => {
    let error;
    if (!value) {
      error = t('Default language is required.');
    }
    if (value) {
      const IsPresent = activeLanguage.filter((language: any) => language.id === value.id);
      if (IsPresent.length === 0) error = t('Default language needs to be an active language.');
    }
    return error;
  };

  const validation = {
    name: Yup.string().required(t('Organisation name is required.')),
    activeLanguages: Yup.array().required(t('Supported Languages is required.')),
    defaultLanguage: Yup.object().nullable().required(t('Default Language is required.')),
    signaturePhrase: Yup.string().nullable().required(t('Webhook signature is required.')),
  };

  const FormSchema = Yup.object().shape(validation);

  const formFields: any = [
    {
      component: Input,
      name: 'name',
      type: 'text',
      placeholder: t('Organisation name'),
    },
    {
      component: AutoComplete,
      name: 'activeLanguages',
      options: languages.languages,
      optionLabel: 'label',
      textFieldProps: {
        variant: 'outlined',
        label: t('Supported languages'),
      },
      validate: validateActiveLanguages,
    },
    {
      component: AutoComplete,
      name: 'defaultLanguage',
      options: languages.languages,
      optionLabel: 'label',
      multiple: false,
      textFieldProps: {
        variant: 'outlined',
        label: t('Default language'),
      },
      validate: validateDefaultLanguage,
    },
    {
      component: Input,
      name: 'signaturePhrase',
      type: 'text',
      placeholder: t('Webhook signature'),
    },
    {
      component: Input,
      name: 'phone',
      type: 'text',
      placeholder: t('Organisation phone number'),
      disabled: true,
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="phone number"
            data-testid="phoneNumber"
            onClick={() => copyToClipboard(client, phone)}
            edge="end"
          >
            <CopyIcon />
          </IconButton>
        </InputAdornment>
      ),
    },
    {
      component: Checkbox,
      name: 'hours',
      title: (
        <Typography variant="h6" style={{ color: '#073f24' }}>
          {t('Hours of operations')}
        </Typography>
      ),
      handleChange,
    },
    {
      component: TimePicker,
      name: 'startTime',
      placeholder: t('Opens'),
      disabled: IsDisabled,
    },
    {
      component: TimePicker,
      name: 'endTime',
      placeholder: t('Closes'),
      disabled: IsDisabled,
    },
    {
      component: AutoComplete,
      name: 'enabledDays',
      options: dayList,
      optionLabel: 'label',
      textFieldProps: {
        variant: 'outlined',
        label: t('Select days'),
      },
      disabled: IsDisabled,
    },
    {
      component: AutoComplete,
      name: 'flowId',
      options: flow.flows,
      optionLabel: 'name',
      multiple: false,
      textFieldProps: {
        variant: 'outlined',
        label: t('Select default flow'),
      },
      disabled: IsDisabled,
      helperText: t(
        'the selected flow will be triggered for messages received outside hours of operations'
      ),
    },
  ];

  const assignDays = (enabledDay: any) => {
    const array: any = [];
    for (let i = 0; i < 7; i += 1) {
      array[i] = { id: i + 1, enabled: false };
      enabledDay.forEach((days: any) => {
        if (i + 1 === days.id) {
          array[i] = { id: i + 1, enabled: true };
        }
      });
    }
    return array;
  };

  const saveHandler = (data: any) => {
    // update organization details in the cache
    client.writeQuery({
      query: GET_ORGANIZATION,
      data: data.updateOrganization,
    });
  };

  const setPayload = (payload: any) => {
    const payloadCopy = payload;
    let object: any = {};
    // set active Language Ids
    const activeLanguageIds = payloadCopy.activeLanguages.map((language: any) => language.id);

    // remove activeLanguages from the payload
    delete payloadCopy.activeLanguages;
    // set default Language Id
    const defaultLanguageId = payloadCopy.defaultLanguage.id;
    // remove defaultLanguage from the payload
    delete payloadCopy.defaultLanguage;

    object = {
      name: payloadCopy.name,
      outOfOffice: {
        enabled: payloadCopy.hours,
        enabledDays: assignDays(payloadCopy.enabledDays),
        endTime: payloadCopy.endTime,
        flowId: payloadCopy.flowId ? payloadCopy.flowId.id : null,
        startTime: payloadCopy.startTime,
      },
      defaultLanguageId,
      activeLanguageIds,
      signaturePhrase: payload.signaturePhrase,
    };

    return object;
  };

  return (
    <FormLayout
      backLinkButton={{ text: t('Back to settings'), link: '/settings' }}
      {...queries}
      title="organization"
      match={{ params: { id: organizationId } }}
      states={States}
      setStates={setStates}
      validationSchema={FormSchema}
      setPayload={setPayload}
      listItemName="Settings"
      dialogMessage=""
      formFields={formFields}
      refetchQueries={[{ query: USER_LANGUAGES }]}
      redirectionLink="settings"
      cancelLink="settings"
      linkParameter="id"
      listItem="organization"
      icon={SettingIcon}
      languageSupport={false}
      type="settings"
      redirect
      afterSave={saveHandler}
    />
  );
};

export default Organisation;
