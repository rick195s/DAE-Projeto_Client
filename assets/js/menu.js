import { state } from '../../store'

export default [
  'General',
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard'
    }
  ],
  'Client',
  [
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle'
    }
  ],
  /* state.userRole == 'ADMINISTRATOR' ? 'Admin' : '',
  state.getRole === 'ADMINISTRATOR' ? [
    {
      to: '/users',
      label: 'Users',
      icon: 'table'
    }
  ] : '', */
  'Admin',
  [
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox'
    },
    {
      to: '/repairshops',
      label: 'Repair Shops',
      icon: 'table'
    },
    {
      to: '/users',
      label: 'Users',
      icon: 'table'
    }
  ],
  'Expert',
  [
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox'
    }
  ]
]
