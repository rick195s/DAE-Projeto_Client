export default function ({ $auth, redirect }) {
  if ($auth.user.role === 'REPAIR_SHOP_EXPERT' || $auth.user.role === 'INSURER_EXPERT') {
    return redirect('/profile')
  }
}
