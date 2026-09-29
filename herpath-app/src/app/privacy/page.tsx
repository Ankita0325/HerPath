import { redirect } from 'next/navigation';

export default function PrivacyRedirect() {
  redirect('/profile?tab=privacy');
}
