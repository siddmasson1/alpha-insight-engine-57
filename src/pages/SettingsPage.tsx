import { Settings } from "lucide-react";

const SettingsPage = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6">
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <Settings className="w-8 h-8 text-muted-foreground" />
    </div>
    <h2 className="text-lg font-semibold text-foreground mb-2">Settings</h2>
    <p className="text-sm text-muted-foreground max-w-xs">
      Configure your portfolio preferences, notification settings, and API integrations. Coming soon.
    </p>
  </div>
);

export default SettingsPage;
