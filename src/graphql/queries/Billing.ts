import { gql } from '@apollo/client';

export const GET_ORGANIZATION_BILLING = gql`
  query getOrganizationBilling {
    getOrganizationBilling {
      billing {
        id
        name
        currency
        email
        isActive
        stripeSubscriptionId
        stripeSubscriptionItems
        stripeSubscriptionStatus
      }
    }
  }
`;

export const GET_CUSTOMER_PORTAL = gql`
  query getCustomerPortal {
    customerPortal {
      url
    }
  }
`;

export default GET_ORGANIZATION_BILLING;