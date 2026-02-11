import AdminLayout from "@/components/layouts/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, Shield, BarChart3, Users } from "lucide-react";

type Profile = {
  user_id: string;
  full_name: string | null;
  position: string | null;
  country: string | null;
  avatar_url: string | null;
};

type UserRole = {
  id: string;
  user_id: string;
  role: "agent" | "player" | "admin";
};

type PlayerStat = {
  id: string;
  user_id: string;
  season: string;
  matches: number;
  goals: number;
  assists: number;
  minutes_played: number;
  shots_on_target: number;
  pass_accuracy: number;
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all profiles
  const { data: profiles, isLoading: profilesLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("user_id, full_name, position, country, avatar_url");
      if (error) throw error;
      return data as Profile[];
    },
  });

  // Fetch all roles
  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data as UserRole[];
    },
  });

  // Fetch all player stats
  const { data: allStats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("player_stats").select("*");
      if (error) throw error;
      return data as PlayerStat[];
    },
  });

  const getRoleForUser = (userId: string) => roles?.find((r) => r.user_id === userId);

  const totalUsers = profiles?.length || 0;
  const totalPlayers = roles?.filter((r) => r.role === "player").length || 0;
  const totalAgents = roles?.filter((r) => r.role === "agent").length || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={<Users className="w-5 h-5" />} label="Total Users" value={totalUsers} />
          <StatCard icon={<BarChart3 className="w-5 h-5" />} label="Players" value={totalPlayers} />
          <StatCard icon={<Shield className="w-5 h-5" />} label="Agents" value={totalAgents} />
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="stats">Player Stats</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="espn-card rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-blue-400" />
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">All Users</h2>
                {profilesLoading || rolesLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles?.map((p) => {
                        const userRole = getRoleForUser(p.user_id);
                        return (
                          <TableRow key={p.user_id}>
                            <TableCell className="font-medium">{p.full_name || "—"}</TableCell>
                            <TableCell>{p.position || "—"}</TableCell>
                            <TableCell>{p.country || "—"}</TableCell>
                            <TableCell>
                              <span className="pill-primary">{userRole?.role || "—"}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {userRole && <RoleChanger roleRecord={userRole} />}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="espn-card rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Player Stats</h2>
                {statsLoading || profilesLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Season</TableHead>
                        <TableHead>Matches</TableHead>
                        <TableHead>Goals</TableHead>
                        <TableHead>Assists</TableHead>
                        <TableHead>Pass Acc.</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allStats?.map((stat) => {
                        const player = profiles?.find((p) => p.user_id === stat.user_id);
                        return (
                          <TableRow key={stat.id}>
                            <TableCell className="font-medium">{player?.full_name || stat.user_id.slice(0, 8)}</TableCell>
                            <TableCell>{stat.season}</TableCell>
                            <TableCell>{stat.matches}</TableCell>
                            <TableCell>{stat.goals}</TableCell>
                            <TableCell>{stat.assists}</TableCell>
                            <TableCell>{stat.pass_accuracy}%</TableCell>
                            <TableCell>
                              <StatsEditor stat={stat} playerName={player?.full_name || "Player"} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {(!allStats || allStats.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            No player stats found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

// --- Sub-components ---

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="espn-card rounded-2xl p-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
    </div>
  </div>
);

const RoleChanger = ({ roleRecord }: { roleRecord: UserRole }) => {
  const [open, setOpen] = useState(false);
  const [newRole, setNewRole] = useState(roleRecord.role);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (role: string) => {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: role as any })
        .eq("id", roleRecord.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roles"] });
      toast({ title: "Role updated!" });
      setOpen(false);
    },
    onError: (err: any) => {
      toast({ title: "Failed to update role", description: err.message, variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm"><Shield className="w-4 h-4 mr-1" /> Change Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Change User Role</DialogTitle></DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>New Role</Label>
            <Select value={newRole} onValueChange={(v) => setNewRole(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="player">Player</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => mutation.mutate(newRole)} disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const StatsEditor = ({ stat, playerName }: { stat: PlayerStat; playerName: string }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...stat });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("player_stats")
        .update({
          season: form.season,
          matches: Number(form.matches),
          goals: Number(form.goals),
          assists: Number(form.assists),
          minutes_played: Number(form.minutes_played),
          shots_on_target: Number(form.shots_on_target),
          pass_accuracy: Number(form.pass_accuracy),
        })
        .eq("id", stat.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({ title: "Stats updated!" });
      setOpen(false);
    },
    onError: (err: any) => {
      toast({ title: "Failed to update stats", description: err.message, variant: "destructive" });
    },
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Edit Stats — {playerName}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <Label>Season</Label>
            <Input value={form.season} onChange={(e) => handleChange("season", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Matches</Label>
            <Input type="number" value={form.matches} onChange={(e) => handleChange("matches", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Goals</Label>
            <Input type="number" value={form.goals} onChange={(e) => handleChange("goals", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Assists</Label>
            <Input type="number" value={form.assists} onChange={(e) => handleChange("assists", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Minutes Played</Label>
            <Input type="number" value={form.minutes_played} onChange={(e) => handleChange("minutes_played", e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Shots on Target</Label>
            <Input type="number" value={form.shots_on_target} onChange={(e) => handleChange("shots_on_target", e.target.value)} />
          </div>
          <div className="col-span-2 space-y-1">
            <Label>Pass Accuracy (%)</Label>
            <Input type="number" value={form.pass_accuracy} onChange={(e) => handleChange("pass_accuracy", e.target.value)} />
          </div>
        </div>
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} className="w-full mt-4">
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Save Stats
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboard;
