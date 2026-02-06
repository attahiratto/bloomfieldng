import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AgentSignupFieldsProps {
  country: string;
  setCountry: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  errors: Record<string, string>;
}

const AgentSignupFields = ({
  country,
  setCountry,
  city,
  setCity,
  bio,
  setBio,
  errors,
}: AgentSignupFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="agentCountry">Country</Label>
          <Input
            id="agentCountry"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. United Kingdom"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="agentCity">City</Label>
          <Input
            id="agentCity"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. London"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="agentBio">About / Agency</Label>
        <Textarea
          id="agentBio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about your agency or scouting background..."
          className="mt-1.5 min-h-[80px]"
          maxLength={500}
        />
        {errors.bio && (
          <p className="text-destructive text-sm mt-1">{errors.bio}</p>
        )}
      </div>
    </div>
  );
};

export default AgentSignupFields;
