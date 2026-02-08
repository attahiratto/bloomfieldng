import PlayerLayout from "@/components/layouts/PlayerLayout";
import { useState, useRef } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Loader2, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const PlayerSettings = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  // Initialize form once profile loads
  if (profile && !initialized) {
    setForm({
      full_name: profile.full_name || "",
      position: profile.position || "",
      height: profile.height || "",
      weight: profile.weight || "",
      preferred_foot: profile.preferred_foot || "",
      country: profile.country || "",
      city: profile.city || "",
      bio: profile.bio || "",
      availability: profile.availability || "Open to Trials",
    });
    setInitialized(true);
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload a JPG, PNG, or WebP image.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      await updateProfile.mutateAsync({ avatar_url: avatarUrl });

      toast({ title: "Avatar updated!", description: "Your profile picture has been changed." });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        full_name: form.full_name || null,
        position: form.position || null,
        height: form.height || null,
        weight: form.weight || null,
        preferred_foot: form.preferred_foot || null,
        country: form.country || null,
        city: form.city || null,
        bio: form.bio || null,
        availability: form.availability || null,
      });
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
      navigate("/player/profile");
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <PlayerLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PlayerLayout>
    );
  }

  const displayName = profile?.full_name || "Player";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <PlayerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/player/profile")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-2xl font-bold text-foreground">Edit Profile</h1>
        </div>

        {/* Avatar Upload */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-blue-400" />
          <div className="p-6">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative group">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={displayName} className="w-24 h-24 rounded-xl object-cover border-2 border-border" />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center border-2 border-border">
                    <span className="font-display font-black text-3xl text-foreground">{initials}</span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  {uploading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
              <div>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                  {uploading ? "Uploading..." : "Change Photo"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG or WebP. Max 5MB.</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarUpload} />
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="espn-card rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-emerald-400" />
          <div className="p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-foreground">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" value={form.full_name || ""} onChange={(e) => handleChange("full_name", e.target.value)} placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={form.position || ""} onValueChange={(v) => handleChange("position", v)}>
                  <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Forward">Forward</SelectItem>
                    <SelectItem value="Winger">Winger</SelectItem>
                    <SelectItem value="Striker">Striker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input id="height" value={form.height || ""} onChange={(e) => handleChange("height", e.target.value)} placeholder="e.g. 180cm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input id="weight" value={form.weight || ""} onChange={(e) => handleChange("weight", e.target.value)} placeholder="e.g. 75kg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred_foot">Preferred Foot</Label>
                <Select value={form.preferred_foot || ""} onValueChange={(v) => handleChange("preferred_foot", v)}>
                  <SelectTrigger><SelectValue placeholder="Select foot" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right">Right</SelectItem>
                    <SelectItem value="Left">Left</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country || ""} onChange={(e) => handleChange("country", e.target.value)} placeholder="Your country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={form.city || ""} onChange={(e) => handleChange("city", e.target.value)} placeholder="Your city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={form.availability || ""} onValueChange={(v) => handleChange("availability", v)}>
                  <SelectTrigger><SelectValue placeholder="Select availability" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open to Trials">Open to Trials</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                    <SelectItem value="Under Contract">Under Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={form.bio || ""} onChange={(e) => handleChange("bio", e.target.value)} placeholder="Tell agents about yourself..." rows={4} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => navigate("/player/profile")}>Cancel</Button>
              <Button onClick={handleSave} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PlayerLayout>
  );
};

export default PlayerSettings;
