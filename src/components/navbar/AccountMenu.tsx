import { useEffect, useRef, useState } from 'react';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';
import { useAuthSession } from '../../auth/AuthSessionProvider';

type AccountMenuProps = {
  onLogIn: () => void;
  onSignUp: () => void;
  onSignOutComplete?: () => void;
  onOpenHostWizard?: () => void;
  hostProfileComplete?: boolean;
};

export default function AccountMenu({ onLogIn, onSignUp, onSignOutComplete, onOpenHostWizard, hostProfileComplete = false }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { session, status, signOut } = useAuthSession();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    onSignOutComplete?.();
  };

  const authenticated = status === 'authenticated' && !!session?.user;

  return (
    <div ref={menuRef}>
      {authenticated ? (
        <UserMenu
          open={open}
          onToggle={() => setOpen((value) => !value)}
          userName={session?.user?.name || session?.user?.email}
          userEmail={session?.user?.email}
          userImage={session?.user?.image}
          onSignOut={handleSignOut}
          onOpenHostWizard={onOpenHostWizard}
          hostProfileComplete={hostProfileComplete}
        />
      ) : (
        <GuestMenu open={open} onToggle={() => setOpen((value) => !value)} onLogIn={onLogIn} onSignUp={onSignUp} />
      )}
    </div>
  );
}
