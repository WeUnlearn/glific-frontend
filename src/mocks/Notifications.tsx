import { FILTER_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT } from '../graphql/queries/Notifications';
import { MARK_NOTIFICATIONS_AS_READ } from '../graphql/mutations/Notifications';

export const getNotificationsQuery = {
  request: {
    query: FILTER_NOTIFICATIONS,
    variables: {
      filter: {},
      opts: { limit: 50, offset: 0, order: 'ASC' },
    },
  },
  result: {
    data: {
      notifications: [
        {
          category: 'Message',
          entity:
            '{"status":"valid","phone":"8535124479","name":"Adelle Cavin","last_message_at":"2021-05-19T14:01:17Z","is_hsm":false,"id":9,"group_id":null,"flow_id":null,"bsp_status":"hsm"}',

          id: '15',
          isRead: false,
          message: 'Could not send message to contact: Check Gupshup Setting',
          severity: '"Error"',
          updatedAt: '2021-05-20T12:06:26Z',
        },
      ],
    },
  },
};
export const getUnFitleredNotificationCountQuery = {
  request: {
    query: GET_NOTIFICATIONS_COUNT,
    variables: {
      filter: {},
    },
  },
  result: {
    data: {
      countNotifications: 2,
    },
  },
};

export const getNotificationCountQuery = {
  request: {
    query: GET_NOTIFICATIONS_COUNT,
    variables: {
      filter: {
        is_read: false,
      },
    },
  },
  result: {
    data: {
      countNotifications: 2,
    },
  },
};

export const markAllNotificationAsRead = {
  request: {
    query: MARK_NOTIFICATIONS_AS_READ,
    variables: {},
  },
  result: {
    data: {
      markNotificationAsRead: true,
    },
  },
};
