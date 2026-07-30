import React, { useState } from "react";
import { User, Lock, Bell, Building2, Save, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";

export function Settings() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [notifications, setNotifications] = useState({
    emailOnApplication: true,
    emailOnStatusChange: true,
    weeklyReport: false,
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser({
        fullname: profileData.fullname,
        phoneNumber: profileData.phoneNumber,
      });
      setLoading(false);
      toast.success("Account settings updated successfully!");
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black text-text tracking-tight">
          Recruiter Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Manage your personal employer account details and notification preferences.
        </p>
      </div>

      {/* Account Details Form */}
      <form onSubmit={handleProfileSave} className="space-y-6">
        <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Personal Details</h3>
              <p className="text-xs text-text-secondary">Your recruiter profile account info</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label required>Full Name</Label>
              <Input
                value={profileData.fullname}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fullname: e.target.value }))
                }
                icon={User}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={profileData.email} disabled icon={User} className="bg-section/50 cursor-not-allowed" />
              <p className="text-[11px] text-text-secondary">Email address cannot be changed.</p>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={profileData.phoneNumber}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                placeholder="10-digit phone number"
                icon={User}
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6 bg-surface rounded-2xl border border-border space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text">Notification Preferences</h3>
              <p className="text-xs text-text-secondary">Email alerts and application notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-section border border-border/60 cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-text">New Application Emails</span>
                <p className="text-xs text-text-secondary">
                  Receive email alert whenever a candidate applies to your job openings.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailOnApplication}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    emailOnApplication: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-section border border-border/60 cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-text">Candidate Status Updates</span>
                <p className="text-xs text-text-secondary">
                  Send automated notifications to candidates when their application status is updated.
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailOnStatusChange}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    emailOnStatusChange: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="h-12 px-8 text-base font-bold shadow-md hover:shadow-lg rounded-xl gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating Settings...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Settings
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
