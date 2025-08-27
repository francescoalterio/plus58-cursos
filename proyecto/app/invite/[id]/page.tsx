import { validateInvite } from "../../../src/lib/firestore-repos";
import { getCurrentUserServer } from "../../../src/lib/auth-session";
import Link from "next/link";

export default async function InvitePage({
  params,
}: {
  params: { id: string };
}) {
  const invite = await validateInvite(params.id);
  const user = await getCurrentUserServer();
  if (!invite)
    return (
      <div className="text-sm text-red-400">
        Invitación inválida o expirada.
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Invitación al curso {invite.courseId}
      </h1>
      <p className="text-sm text-neutral-400">
        Usos: {invite.used}/{invite.maxUses ?? "∞"}
      </p>
      {!user && (
        <div className="space-y-2">
          <p className="text-sm">Para registrarte como nuevo estudiante:</p>
          <Link
            href={`/register?inviteId=${invite.id}`}
            className="inline-block px-3 py-1 rounded bg-brand text-neutral-900 text-sm"
          >
            Crear cuenta y unirme
          </Link>
          <p className="text-xs text-neutral-500">
            Si ya tienes cuenta inicia sesión y vuelve a esta página para añadir
            el curso.
          </p>
        </div>
      )}
      {user && <JoinExistingForm inviteId={invite.id} />}
    </div>
  );
}

function JoinExistingForm({ inviteId }: { inviteId: string }) {
  async function join(formData: FormData) {
    "use server";
    await fetch("/api/invites/join-existing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteId }),
    });
  }
  return (
    <form action={join} className="space-y-2">
      <button
        className="px-3 py-1 rounded bg-brand text-neutral-900 text-sm"
        type="submit"
      >
        Añadir curso a mi cuenta
      </button>
    </form>
  );
}
