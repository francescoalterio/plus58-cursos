"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileData {
  fullName: string;
  birthDate: string;
  idNumber: string;
}

export default function ProfileClient({
  initialProfile,
  courses,
  email,
}: {
  initialProfile: ProfileData | null;
  courses: { cid: string; state: string; title?: string }[];
  email: string;
}) {
  const [profile, setProfile] = useState<ProfileData>(
    initialProfile || { fullName: "", birthDate: "", idNumber: "" }
  );
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState(email);
  const [emailMsg, setEmailMsg] = useState<string | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    // Avisar a otros componentes
    window.dispatchEvent(new Event("session-changed"));
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setProfileMsg("Guardado");
    } catch (e: any) {
      setProfileMsg(e.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!newEmail || newEmail === email) return;
    setEmailLoading(true);
    setEmailMsg(null);
    try {
      const res = await fetch("/api/profile/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setEmailMsg(
        "Email actualizado. Cierra sesión y vuelve a entrar si no ves el cambio."
      );
    } catch (e: any) {
      setEmailMsg(e.message);
    } finally {
      setEmailLoading(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!pwd1 || pwd1 !== pwd2) {
      setPwdMsg("Las contraseñas no coinciden");
      return;
    }
    setPwdLoading(true);
    setPwdMsg(null);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setPwdMsg("Contraseña actualizada");
      setPwd1("");
      setPwd2("");
    } catch (e: any) {
      setPwdMsg(e.message);
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-brand to-emerald-300 bg-clip-text text-transparent">
          Perfil
        </h1>
        <button
          onClick={logout}
          className="text-xs sm:text-sm px-4 py-2 rounded-md bg-red-500/15 border border-red-500/40 text-red-400 hover:bg-red-500/25 hover:border-red-500 transition shadow-sm"
        >
          Cerrar sesión
        </button>
      </div>
      <section>
        <h2 className="text-lg font-semibold text-brand mb-4">Datos personales</h2>
        <form onSubmit={saveProfile} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Nombre completo
            </label>
            <input
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={profile.fullName}
              onChange={(e) =>
                setProfile({ ...profile, fullName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={profile.birthDate}
              onChange={(e) =>
                setProfile({ ...profile, birthDate: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Número de cédula
            </label>
            <input
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={profile.idNumber}
              onChange={(e) =>
                setProfile({ ...profile, idNumber: e.target.value })
              }
              required
            />
          </div>
          <button
            disabled={savingProfile}
            className="bg-brand text-neutral-900 px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
          >
            {savingProfile ? "Guardando..." : "Guardar"}
          </button>
          {profileMsg && (
            <p className="text-xs text-neutral-400">{profileMsg}</p>
          )}
        </form>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-brand mb-4">Cursos</h2>
        <ul className="space-y-2 text-sm">
          {courses.map((c) => (
            <li
              key={c.cid}
              className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded px-3 py-2"
            >
              <span className="text-xs font-medium text-neutral-200">
                {c.title || c.cid}
                <span className="ml-2 font-mono text-[10px] text-neutral-500">
                  {c.cid}
                </span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 capitalize">
                {c.state}
              </span>
            </li>
          ))}
          {!courses.length && (
            <li className="text-xs text-neutral-500">Sin cursos.</li>
          )}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-brand mb-4">Email</h2>
        <form onSubmit={changeEmail} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Nuevo email
            </label>
            <input
              type="email"
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <button
            disabled={emailLoading || newEmail === email}
            className="bg-brand text-neutral-900 px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
          >
            {emailLoading ? "Actualizando..." : "Actualizar email"}
          </button>
          {emailMsg && <p className="text-xs text-neutral-400">{emailMsg}</p>}
        </form>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-brand mb-4">Contraseña</h2>
        <form onSubmit={changePassword} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Nueva contraseña
            </label>
            <input
              type="password"
              minLength={6}
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={pwd1}
              onChange={(e) => setPwd1(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase text-neutral-400">
              Confirmar contraseña
            </label>
            <input
              type="password"
              minLength={6}
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              required
            />
          </div>
          <button
            disabled={pwdLoading}
            className="bg-brand text-neutral-900 px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
          >
            {pwdLoading ? "Actualizando..." : "Cambiar contraseña"}
          </button>
          {pwdMsg && <p className="text-xs text-neutral-400">{pwdMsg}</p>}
        </form>
      </section>
    </div>
  );
}
