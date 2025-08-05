import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, DollarSign, ListChecks, MoreVertical, Ruler } from "lucide-react";
import type { Room } from "@/types";

interface RoomCardProps {
  room: Room;
  onViewDetails: (roomId: string) => void;
  onAddProject: (roomId: string) => void;
}

const RoomCard = ({ room, onViewDetails, onAddProject }: RoomCardProps) => {
  const budgetUsed = room.projects.reduce((acc, project) => acc + project.estimatedCost, 0);
  const budgetPercentage = room.totalBudget > 0 ? (budgetUsed / room.totalBudget) * 100 : 0;
  const activeProjects = room.projects.filter(p => p.status === "in-progress").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card shadow-md">
      <div className="relative">
        {room.imageUrl ? (
          <img 
            src={room.imageUrl} 
            alt={room.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white backdrop-blur-sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {room.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{room.name}</h3>
          <p className="text-sm text-muted-foreground">
            {room.projects.length} projects • {room.completedProjects} completed
          </p>
          {room.measurements && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Ruler className="w-3 h-3" />
              {room.measurements.length && room.measurements.width ? (
                <span>{room.measurements.length}' × {room.measurements.width}' ({room.measurements.squareFootage?.toFixed(0)} sq ft)</span>
              ) : (
                <span>
                  {[room.measurements.length && `${room.measurements.length}'L`, 
                    room.measurements.width && `${room.measurements.width}'W`, 
                    room.measurements.height && `${room.measurements.height}'H`]
                    .filter(Boolean).join(' × ')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-medium">${budgetUsed.toLocaleString()} / ${room.totalBudget.toLocaleString()}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Active Projects Preview */}
        {activeProjects > 0 && (
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">
              {activeProjects} active project{activeProjects > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(room.id)}
          >
            View Details
          </Button>
          <Button 
            variant="accent" 
            size="sm" 
            className="flex-1"
            onClick={() => onAddProject(room.id)}
          >
            Add Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;