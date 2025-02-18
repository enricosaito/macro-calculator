import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BMRCalculation = ({ userData, updateUserData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Let's Calculate Your BMR</h2>
      <p className="mb-6">Your Basal Metabolic Rate (BMR) is the number of calories you burn at rest.</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={userData.weight}
            onChange={(e) => updateUserData({ weight: e.target.value })}
            placeholder="Enter your weight"
          />
        </div>
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={userData.height}
            onChange={(e) => updateUserData({ height: e.target.value })}
            placeholder="Enter your height"
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            placeholder="Enter your age"
          />
        </div>
        <div>
          <Label>Sex</Label>
          <RadioGroup
            value={userData.sex}
            onValueChange={(value) => updateUserData({ sex: value })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default BMRCalculation;
