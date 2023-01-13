export default [
  'General',
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard',
      roles: ['ADMINISTRATOR', 'CLIENT']
    }
  ],
  'Client',
  [
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle',
      roles: ['CLIENT']
    },
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox',
      roles: ['CLIENT']
    }
  ],

  'Admin',
  [
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle',
      roles: ['ADMINISTRATOR']
    },
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox',
      roles: ['ADMINISTRATOR']
    },
    {
      to: '/repairshops',
      label: 'Repair Shops',
      icon: 'table',
      roles: ['ADMINISTRATOR']
    },
    {
      to: '/users',
      label: 'Users',
      icon: 'table',
      roles: ['ADMINISTRATOR']
    }
  ],
  'Expert',
  [
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle',
      roles: ['REPAIR_SHOP_EXPERT', 'INSURER_EXPERT']
    },
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox',
      roles: ['REPAIR_SHOP_EXPERT', 'INSURER_EXPERT']
    }
  ]
]
