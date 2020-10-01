import { GET_ORGANIZATION, GET_PROVIDERS, GET_CREDENTIAL } from '../graphql/queries/Organization';

export const getOrganizationQuery = [
  {
    request: {
      query: GET_ORGANIZATION,
    },
    result: {
      data: {
        organization: {
          organization: {
            defaultLanguage: { id: '1', label: 'English (United States)' },
            activeLanguages: [
              {
                id: '1',
                label: 'English (United States)',
              },
            ],
            id: '1',
            outOfOffice: {
              enabled: true,
              enabledDays: [
                { enabled: true, id: 1 },
                { enabled: true, id: 2 },
                { enabled: true, id: 3 },
                { enabled: true, id: 4 },
                { enabled: true, id: 5 },
                { enabled: false, id: 6 },
                { enabled: false, id: 7 },
              ],
              endTime: '12:30:27',
              flowId: '6',
              startTime: '12:31:27',
            },
            provider: {
              apiEndPoint: 'https://api.gupshup.io/sm/api/v1',
              id: '1',
              name: 'Gupshup',
              url: 'https://gupshup.io/',
            },
            providerAppname: 'ADD_PROVIDER_API_KEY',
            providerPhone: '917834811114',
            name: 'Glific',
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_ORGANIZATION,
      variables: {},
    },
    result: {
      data: {
        organization: {
          organization: {
            defaultLanguage: { id: '1', label: 'English (United States)' },
            activeLanguages: [
              {
                id: '1',
                label: 'English (United States)',
              },
            ],
            id: '1',
            outOfOffice: {
              enabled: true,
              enabledDays: [
                { enabled: true, id: 1 },
                { enabled: true, id: 2 },
                { enabled: true, id: 3 },
                { enabled: true, id: 4 },
                { enabled: true, id: 5 },
                { enabled: false, id: 6 },
                { enabled: false, id: 7 },
              ],
              endTime: '12:30:27',
              flowId: '6',
              startTime: '12:31:27',
            },
            provider: {
              apiEndPoint: 'https://api.gupshup.io/sm/api/v1',
              id: '1',
              name: 'Gupshup',
              url: 'https://gupshup.io/',
            },
            providerAppname: 'ADD_PROVIDER_API_KEY',
            providerPhone: '917834811114',
            name: 'Glific',
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_ORGANIZATION,
      variables: { id: '1' },
    },
    result: {
      data: {
        organization: {
          organization: {
            defaultLanguage: { id: '1', label: 'English (United States)' },
            activeLanguages: [
              {
                id: '1',
                label: 'English (United States)',
              },
            ],
            id: '1',
            outOfOffice: {
              enabled: true,
              enabledDays: [
                { enabled: true, id: 1 },
                { enabled: true, id: 2 },
                { enabled: true, id: 3 },
                { enabled: true, id: 4 },
                { enabled: true, id: 5 },
                { enabled: false, id: 6 },
                { enabled: false, id: 7 },
              ],
              endTime: '12:30:27',
              flowId: '6',
              startTime: '12:31:27',
            },
            provider: {
              apiEndPoint: 'https://api.gupshup.io/sm/api/v1',
              id: '1',
              name: 'Gupshup',
              url: 'https://gupshup.io/',
            },
            providerAppname: 'ADD_PROVIDER_API_KEY',
            providerPhone: '917834811114',
            name: 'Glific',
          },
        },
      },
    },
  },
];

export const getProvidersQuery = [
  {
    request: {
      query: GET_PROVIDERS,
    },
    result: {
      data: {
        providers: [
          {
            group: 'bsp',
            id: '1',
            isRequired: true,
            keys:
              '{"worker":{"view_only":true,"type":"string","label":"Outbound Message Worker","default":"Glific.Providers.Gupshup.Worker"},"url":{"view_only":true,"type":"string","label":"BSP Home Page","default":"https://gupshup.io/"},"handler":{"view_only":true,"type":"string","label":"Inbound Message Handler","default":"Glific.Providers.Gupshup.Message"},"api_end_point":{"view_only":false,"type":"string","label":"API End Point","default":"https://api.gupshup.io/sm/api/v1"}}',
            name: 'Gupshup',
            secrets:
              '{"app_name":{"view_only":false,"type":"string","label":"App Name","default":null},"api_key":{"view_only":false,"type":"string","label":"API Key","default":null}}',
            shortcode: 'gupshup',
          },
          {
            group: 'bsp',
            id: '2',
            isRequired: true,
            keys:
              '{"worker":{"view_only":true,"type":"string","label":"Outbound Message Worker","default":"Glific.Providers.Glifproxy.Worker"},"url":{"view_only":true,"type":"string","label":"BSP Home Page","default":"https://glific.io/"},"handler":{"view_only":true,"type":"string","label":"Inbound Message Handler","default":"Glific.Providers.Gupshup.Message"},"api_end_point":{"view_only":false,"type":"string","label":"API End Point","default":"https://glific.test:4000/"}}',
            name: 'Glifproxy',
            secrets: '{}',
            shortcode: 'glifproxy',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PROVIDERS,
      variables: { filter: { shortcode: null } },
    },
    result: {
      data: {
        providers: [
          {
            group: 'bsp',
            id: '1',
            isRequired: true,
            keys:
              '{"worker":{"view_only":true,"type":"string","label":"Outbound Message Worker","default":"Glific.Providers.Gupshup.Worker"},"url":{"view_only":true,"type":"string","label":"BSP Home Page","default":"https://gupshup.io/"},"handler":{"view_only":true,"type":"string","label":"Inbound Message Handler","default":"Glific.Providers.Gupshup.Message"},"api_end_point":{"view_only":false,"type":"string","label":"API End Point","default":"https://api.gupshup.io/sm/api/v1"}}',
            name: 'Gupshup',
            secrets:
              '{"app_name":{"view_only":false,"type":"string","label":"App Name","default":null},"api_key":{"view_only":false,"type":"string","label":"API Key","default":null}}',
            shortcode: 'gupshup',
          },
          {
            group: 'bsp',
            id: '2',
            isRequired: true,
            keys:
              '{"worker":{"view_only":true,"type":"string","label":"Outbound Message Worker","default":"Glific.Providers.Glifproxy.Worker"},"url":{"view_only":true,"type":"string","label":"BSP Home Page","default":"https://glific.io/"},"handler":{"view_only":true,"type":"string","label":"Inbound Message Handler","default":"Glific.Providers.Gupshup.Message"},"api_end_point":{"view_only":false,"type":"string","label":"API End Point","default":"https://glific.test:4000/"}}',
            name: 'Glifproxy',
            secrets: '{}',
            shortcode: 'glifproxy',
          },
        ],
      },
    },
  },
];

export const getCredential = [
  {
    request: {
      query: GET_CREDENTIAL,
    },
    result: {
      data: {
        credential: {
          credential: {
            id: '1',
            keys:
              '{"worker":"Glific.Providers.Gupshup.Worker","url":"https://gupshup.io/","handler":"Glific.Providers.Gupshup.Message","api_end_point":"https://api.gupshup.io/sm/api/v1"}',
            provider: {
              shortcode: 'gupshup',
            },
            secrets:
              '{"app_name":"Please enter your App Name here","api_key":"Please enter your key here"}',
          },
        },
      },
    },
  },
];
