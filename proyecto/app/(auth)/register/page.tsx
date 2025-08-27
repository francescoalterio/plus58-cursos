import { InviteRegisterForm } from "../../../src/components/InviteRegisterForm";
import { notFound } from "next/navigation";
import { validateInvite } from "../../../src/lib/firestore-repos";

interface Props {
  searchParams: { invite?: string; inviteId?: string };
}

export default async function RegisterPage({ searchParams }: Props) {
  const inviteId = searchParams.invite || searchParams.inviteId; // compat param viejo
  if (!inviteId) return notFound();
  const invite = await validateInvite(inviteId);
  if (!invite) return notFound();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4 shadow-md">
        <h2 className="text-xl font-semibold text-brand">
          Registro con invitación
        </h2>
        <p className="text-xs text-neutral-500">
          Curso: <span className="font-mono">{invite.courseId}</span>
        </p>
        <InviteRegisterForm inviteId={inviteId} />
      </div>
    </div>
  );
}
