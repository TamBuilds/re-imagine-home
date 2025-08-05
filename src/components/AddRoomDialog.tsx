import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, DollarSign, Ruler } from "lucide-react";

interface AddRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRoom: (room: {
    name: string;
    type: string;
    imageUrl?: string;
    totalBudget: number;
    measurements?: {
      length?: number;
      width?: number;
      height?: number;
      squareFootage?: number;
    };
  }) => void;
}

const roomTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Home Office",
  "Basement",
  "Garage",
  "Laundry Room",
  "Hallway",
  "Closet",
  "Other"
];

const AddRoomDialog = ({ open, onOpenChange, onAddRoom }: AddRoomDialogProps) => {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!roomName || !roomType) return;

    const measurements = length || width || height ? {
      length: parseFloat(length) || undefined,
      width: parseFloat(width) || undefined,
      height: parseFloat(height) || undefined,
      squareFootage: length && width ? parseFloat(length) * parseFloat(width) : undefined,
    } : undefined;

    onAddRoom({
      name: roomName,
      type: roomType,
      imageUrl: imagePreview || undefined,
      totalBudget: parseFloat(totalBudget) || 0,
      measurements,
    });

    // Reset form
    setRoomName("");
    setRoomType("");
    setTotalBudget("");
    setLength("");
    setWidth("");
    setHeight("");
    setImageFile(null);
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Add a room to start tracking your renovation projects
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Room Photo (Optional)</Label>
            <Card className="border-dashed border-2 border-border hover:border-accent transition-colors">
              <CardContent className="p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Room preview" 
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Room Name */}
          <div className="space-y-2">
            <Label htmlFor="room-name">Room Name</Label>
            <Input
              id="room-name"
              placeholder="e.g., Master Bedroom"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <Label>Room Type</Label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Measurements */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Room Measurements (Optional)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  type="number"
                  placeholder="Length (ft)"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Width (ft)"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
            </div>
            <Input
              type="number"
              placeholder="Height (ft)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            {length && width && (
              <p className="text-xs text-muted-foreground">
                Square footage: {(parseFloat(length) * parseFloat(width)).toFixed(1)} sq ft
              </p>
            )}
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Total Budget (Optional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                placeholder="0"
                className="pl-9"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!roomName || !roomType}
          >
            Add Room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;