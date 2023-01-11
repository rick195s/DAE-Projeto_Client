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
