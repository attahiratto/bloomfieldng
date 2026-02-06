import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlayerSignupFieldsProps {
  position: string;
  setPosition: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  preferredFoot: string;
  setPreferredFoot: (v: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  errors: Record<string, string>;
}

const POSITIONS = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

const PlayerSignupFields = ({
  position,
  setPosition,
  height,
  setHeight,
  weight,
  setWeight,
  preferredFoot,
  setPreferredFoot,
  dateOfBirth,
  setDateOfBirth,
  country,
  setCountry,
  errors,
}: PlayerSignupFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Position</Label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {POSITIONS.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && (
            <p className="text-destructive text-sm mt-1">{errors.position}</p>
          )}
        </div>

        <div>
          <Label htmlFor="preferredFoot">Preferred Foot</Label>
          <Select value={preferredFoot} onValueChange={setPreferredFoot}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select foot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Right">Right</SelectItem>
              <SelectItem value="Left">Left</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 178"
            className="mt-1.5"
          />
          {errors.height && (
            <p className="text-destructive text-sm mt-1">{errors.height}</p>
          )}
        </div>
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 72"
            className="mt-1.5"
          />
          {errors.weight && (
            <p className="text-destructive text-sm mt-1">{errors.weight}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="mt-1.5"
          />
          {errors.dateOfBirth && (
            <p className="text-destructive text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Nigeria"
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerSignupFields;
