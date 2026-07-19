import ChangePasswordForm from "@/components/admin/changePasswordForm";
import ExportButtons from "@/components/admin/exportButton";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10 px-8 py-8">
      <div>
        <h1 className="text-xl font-medium text-off-white">Settings</h1>
        <p className="text-sm text-gs-500">
          Manage your admin access and archive data.
        </p>
      </div>

      <div className="flex gap-6">
        <section className="flex flex-col flex-1 gap-4 bg-night-black p-8 rounded-2xl border border-gs-900  ">
          <h2 className="text-sm tracking-wide font-medium text-gs-200 uppercase">
            Change Password
          </h2>
          <ChangePasswordForm />
        </section>

        <section className="flex flex-col flex-1 gap-4 bg-night-black p-8 rounded-2xl border border-gs-900 ">
          <h2 className="text-sm tracking-wide font-medium text-gs-200 uppercase">
            Export Data
          </h2>
          <p className="text-sm text-gs-500">
            Download all references as a spreadsheet.
          </p>
          <ExportButtons />
        </section>
      </div>
    </div>
  );
}
