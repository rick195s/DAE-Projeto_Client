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
      roles: ['CLIENT', 'ADMINISTRATOR', 'REPAIR_SHOP_EXPERT', 'INSURER_EXPERT']
    }
  ],

  'Admin',
  [
    {
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox',
      roles: ['CLIENT', 'ADMINISTRATOR', 'REPAIR_SHOP_EXPERT', 'INSURER_EXPERT']
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
      to: '/occurrences',
      label: 'Occurrences',
      icon: 'format-list-checkbox',
      roles: ['REPAIR_SHOP_EXPERT', 'INSURER_EXPERT']
    }
  ]
]
