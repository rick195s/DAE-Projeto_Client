export default [
  'General',
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard'
    }
  ],
  'Resources',
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
      to: '/forms',
      label: 'Forms',
      icon: 'square-edit-outline'
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle'
    },
    {
      to: '/login',
      label: 'Login',
      icon: 'lock'
    },
    {
      label: 'Submenus',
      subLabel: 'Submenus Example',
      icon: 'view-list',
      menu: [
        {
          href: '#void',
          label: 'Sub-item One'
        },
        {
          href: '#void',
          label: 'Sub-item Two'
        }
      ]
    }
  ],
  'About',
  [
    {
      href: 'https://justboil.me/bulma-admin-template/one/',
      label: 'Premium',
      icon: 'monitor',
      target: '_blank'
    },
    {
      href: 'https://github.com/vikdiesel/admin-one-vue-bulma-dashboard',
      label: 'GitHub',
      icon: 'github-circle',
      target: '_blank'
    }
  ]
]
